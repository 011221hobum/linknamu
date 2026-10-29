import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

type ClickDoc = { _id: string; count: number };

// 개발 모드의 HMR에서 연결이 계속 늘어나지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo.mongoClientPromise;
}

async function getClicksCollection() {
  const client = getClient();
  if (!client) return null;
  return (await client).db(dbName).collection<ClickDoc>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const clicks = await getClicksCollection();
    if (!clicks) return {};
    const docs = await clicks.find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}

export async function incrementClick(linkId: string): Promise<boolean> {
  const clicks = await getClicksCollection();
  if (!clicks) return false;
  await clicks.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
  return true;
}
