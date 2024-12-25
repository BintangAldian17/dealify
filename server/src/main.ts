import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
