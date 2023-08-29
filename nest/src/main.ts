import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening to port ${port}`);
  console.log('init test');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
