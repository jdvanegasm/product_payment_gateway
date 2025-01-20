import { Injectable, Inject } from '@nestjs/common';
import { WompiPort } from '../../application/ports/wompi.ports';

@Injectable()
export class TokenizeCardUseCase {
  constructor(
    @Inject('WOMPI_PORT')
    private readonly wompiPort: WompiPort,
  ) {}

  async execute(cardData: any): Promise<any> {
    try {
      const token = await this.wompiPort.tokenizeCard(cardData);
      return token;
    } catch (error) {
      console.error('Error during card tokenization:', error.message || error.response?.data);
      throw new Error('Failed to tokenize card');
    }
  }
}