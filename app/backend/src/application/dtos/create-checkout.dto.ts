import { IsNotEmpty, IsString, IsNumber, IsOptional, Matches, Length } from 'class-validator';

/**
 * DTO for validating checkout data from the frontend.
 */
export class CreateCheckoutDTO {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  @Length(16, 19, { message: 'Card number must be between 16 and 19 digits.' })
  cardNumber: string;

  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Expiry date must be in MM/YY format.' })
  expiryDate: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 4, { message: 'CVV must be 3 or 4 digits.' })
  cvv: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, { message: 'Name must contain only letters and spaces.' })
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits.' })
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @IsNotEmpty()
  @IsNumber()
  shippingCost: number;

  @IsNotEmpty()
  @IsString()
  paymentToken: string;
}