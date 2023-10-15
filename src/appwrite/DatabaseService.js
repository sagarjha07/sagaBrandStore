const {Client, Databases} = require('appwrite');
import {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PRODUCTS_COLLECTION_ID,
} from '@env';

class DataBaseService {
  client = new Client();
  database;
  constructor() {
    this.client
      .setEndpoint(APPWRITE_API_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  async getAllProducts() {
    try {
      const result = await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_PRODUCTS_COLLECTION_ID,
      );
      return result;
    } catch (error) {
      console.log('Error in getAllProducts::', error);
    }
  }
}

const databaseService = new DataBaseService();
export default databaseService;
