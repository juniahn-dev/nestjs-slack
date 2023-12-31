import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import path from 'path';
import session from 'express-session';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'uploads')
      : path.join(__dirname, '..', 'uploads'),
    {
      prefix: '/uploads',
    },
  );
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'public')
      : path.join(__dirname, '..', 'public'),
    {
      prefix: '/dist',
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Slack API')
    .setDescription('Depend on Slack API dev document.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
  console.log(`Listening to port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
