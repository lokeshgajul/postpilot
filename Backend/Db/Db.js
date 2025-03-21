import sdk, { ID } from "node-appwrite";

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.db_projectId)
  .setKey(process.env.appwrite_key);

const databases = new sdk.Databases(client);

export async function prepareDb() {
  try {
    const dbList = await databases.list();
    let database = dbList.databases.find((db) => db.name === "PostDB");

    if (!database) {
      console.log("Database not found. Creating new database...");
      database = await databases.create(ID.unique(), "PostDB");
    } else {
      console.log("Database already exists. Using existing database.");
    }

    // Check for existing collection
    const collectionList = await databases.listCollections(database.$id);
    let collection = collectionList.collections.find(
      (col) => col.name === "Posts"
    );

    if (!collection) {
      console.log("Collection not found. Creating new collection...");
      collection = await databases.createCollection(
        database.$id,
        ID.unique(),
        "Posts"
      );

      // Create attributes for the collection
      await databases.createStringAttribute(
        database.$id,
        collection.$id,
        "title",
        255,
        true
      );
      await databases.createStringAttribute(
        database.$id,
        collection.$id,
        "post",
        5000,
        true
      );
      await databases.createStringAttribute(
        database.$id,
        collection.$id,
        "createdAt",
        50,
        true
      );

      console.log("Collection and attributes created successfully.");
    } else {
      console.log("Collection already exists. Skipping creation.");
    }

    return { databaseId: database.$id, collectionId: collection.$id };
  } catch (error) {
    console.error("Error during database setup:", error.message);
    throw error;
  }
}

// Function to store post
export const storePost = async (req, res) => {
  const { title, post } = req.body;
  try {
    const response = await databases.createDocument(
      process.env.db_ID,
      process.env.collection_ID,
      ID.unique(),
      { title, post, createdAt: new Date().toISOString() }
    );
    console.log("Post stored successfully:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error storing post:", error.message);
    throw error;
  }
};
