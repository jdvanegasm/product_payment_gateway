export interface WompiPort {
  createTransaction(transactionData: any): Promise<any>;
  getTransactionStatus(transactionId: string): Promise<any>;
  tokenizeCard(cardData: any): Promise<any>;
}