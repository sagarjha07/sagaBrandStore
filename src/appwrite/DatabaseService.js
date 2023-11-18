const {Client, Databases, Query, ID} = require('appwrite');
import {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PRODUCTS_COLLECTION_ID,
  APPWRITE_ORDERS_COLLECTION_ID,
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

  async getAllProductsWithFilter(filter) {
    try {
      const result = await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_PRODUCTS_COLLECTION_ID,
        [Query.equal('type', filter)],
      );
      return result;
    } catch (error) {
      console.log('Error in getAllProductsWithFilter::', error);
    }
  }

  async getAllProductsWithSearchStr(searchStr) {
    try {
      const result = await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_PRODUCTS_COLLECTION_ID,
        [Query.search('name', searchStr)],
      );

      return result.documents;
    } catch (error) {
      console.log('Error in getAllProductsWithSearchStr::', error);
    }
  }

  async createOrder(orderDetails) {
    try {
      const order = await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_ORDERS_COLLECTION_ID,
        ID.unique(),
        orderDetails,
      );
      return order;
    } catch (error) {
      console.log('Error in createOrder::', error);
    }
  }

  async getAllOrders() {
    try {
      const orderList = await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_ORDERS_COLLECTION_ID,
      );
      return orderList.documents;
    } catch (error) {
      console.log('Error in getAllOrders::', error);
    }
  }
}

const databaseService = new DataBaseService();
export default databaseService;
