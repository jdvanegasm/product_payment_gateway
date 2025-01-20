import axios from 'axios';
import { WompiPort } from '../../application/ports/wompi.ports';

const WOMPI_API_URL = 'https://api-sandbox.co.uat.wompi.dev/v1';
const API_KEY = process.env.WOMPI_API_KEY;
const PUBLIC_API_KEY = process.env.WOMPI_API_PUBLIC_KEY;

export class WompiAdapter implements WompiPort {
  async createTransaction(transactionData: any) {
    try {
      const response = await axios.post(`${WOMPI_API_URL}transactions`, transactionData, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Return response data from Wompi API
    } catch (error) {
      console.error('Error creating transaction with Wompi:', error.response?.data || error.message);
      throw new Error('Error creating transaction with Wompi');
    }
  }

  async getTransactionStatus(transactionId: string) {
    try {
      const response = await axios.get(`${WOMPI_API_URL}transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      return response.data; // Return transaction status
    } catch (error) {
      console.error('Error fetching transaction status:', error.response?.data || error.message);
      throw new Error('Error fetching transaction status');
    }
  }

  async tokenizeCard(cardData: any) {
    try {
      const response = await axios.post(`${WOMPI_API_URL}tokens/cards`, cardData, {
        headers: {
          Authorization: `Bearer ${PUBLIC_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Return tokenized card data
    } catch (error) {
      console.error('Error tokenizing card:', error.response?.data || error.message);
      throw new Error('Error tokenizing card');
    }
  }
}