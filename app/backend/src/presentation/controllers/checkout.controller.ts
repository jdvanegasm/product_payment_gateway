import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CheckoutUseCase } from '../application/use-cases/checkout.usecase';
import { CreateCheckoutDTO } from '../../application/dtos/create-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutUseCase: CheckoutUseCase) {}

  /**
   * Handles the creation of a transaction for a checkout process.
   * @param createCheckoutDTO - Data received from the frontend form.
   * @returns Transaction and Wompi response.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTransaction(@Body() createCheckoutDTO: CreateCheckoutDTO) {
    return await this.checkoutUseCase.execute(createCheckoutDTO);
  }
}