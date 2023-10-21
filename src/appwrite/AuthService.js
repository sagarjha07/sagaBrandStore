import {Client, Account, ID} from 'appwrite';
import {APPWRITE_API_ENDPOINT, APPWRITE_PROJECT_ID} from '@env';

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(APPWRITE_API_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async signUp(email, password, name) {
    try {
      const res = await this.account.create(ID.unique(), email, password, name);
      return res;
    } catch (error) {
      console.log('Error in signUp::', error);
      throw error;
    }
  }

  async logIn(email, password) {
    try {
      const res = await this.account.createEmailSession(email, password);
      return res;
    } catch (error) {
      console.log('Error in Login::', error);
      throw error;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Error in logOut::', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const res = await this.account.get();
      return res;
    } catch (error) {
      console.log('Error in getCurrentUser::', error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
