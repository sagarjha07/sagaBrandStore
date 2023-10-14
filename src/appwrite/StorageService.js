import {Storage, Client} from 'appwrite';
import {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_IMAGES_BUCKET_ID,
} from '@env';

class StorageService {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setEndpoint(APPWRITE_API_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  getImageById(id) {
    try {
      const result = this.storage.getFilePreview(APPWRITE_IMAGES_BUCKET_ID, id);
      return result.toJSON();
    } catch (error) {
      console.log('Error in getImageById::', error);
    }
  }
}

const storageService = new StorageService();
export default storageService;
