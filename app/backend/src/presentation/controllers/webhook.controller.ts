import { Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { ProcessWompiWebhookUseCase } from '../../application/use-cases/process-wompi-webhook.usecase';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly processWompiWebhookUseCase: ProcessWompiWebhookUseCase) {}

  @Post('wompi')
  async handleWompiWebhook(
    @Body() payload: any,
    @Headers('X-Wompi-Signature') wompiSignature: string,
  ) {
    if (!payload || !wompiSignature) {
      throw new BadRequestException('Invalid webhook request');
    }

    await this.processWompiWebhookUseCase.execute(payload, wompiSignature);

    return { message: 'Webhook processed successfully' };
  }
}
