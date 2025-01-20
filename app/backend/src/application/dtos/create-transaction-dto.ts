import { IsNotEmpty, IsString, IsNumber, IsEnum, Length } from 'class-validator';
import { TransactionStatus, CardType, PaymentStatus } from '@prisma/client';

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @IsNotEmpty()
  @IsNumber()
  shippingCost: number;

  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  @IsString()
  wompiTransactionId: string;

  @IsNotEmpty()
  @IsEnum(CardType)
  cardType: CardType;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4, { message: 'Last four digits must be exactly 4 digits.' })
  lastFourDigits: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}