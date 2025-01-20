import { Controller, Post, Body } from '@nestjs/common';
import { TokenizeCardUseCase } from '../../application/use-cases/tokenize-card.usecase';

@Controller('cards')
export class CardTokenController {
  constructor(private readonly tokenizeCardUseCase: TokenizeCardUseCase) {}

  @Post('tokenize')
  async tokenizeCard(@Body() cardData: any) {
    return await this.tokenizeCardUseCase.execute(cardData);
  }
}