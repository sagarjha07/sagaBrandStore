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

  async signUp(email, password) {
    try {
      const res = await this.account.create(ID, email, password);
      return res;
    } catch (error) {
      console.log('Error in signUp::', error);
    }
  }

  async logIn(email, password) {
    try {
      const res = await this.account.createEmailSession(email, password);
      return res;
    } catch (error) {
      console.log('Error in Login::', error);
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Error in logOut::', error);
    }
  }

  async getCurrentUser() {
    try {
      const res = await this.account.get();
      return res;
    } catch (error) {
      console.log('Error in getCurrentUser::', error);
    }
  }
}

const authService = new AuthService();
export default authService;
