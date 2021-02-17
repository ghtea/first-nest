import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // 에러메시지에서 잘못된 거에 대해 설명 해준다
    transform: true, // 사용자에게서 오는 데이터를 우리가 원하는 타입(타입스크립트 코드로 판단)으로 바꿔준다 // 쿼리는 항상 string 인데 이걸 자동으로 숫자등으로 바꿔준다
  }));  // 쿼리 유효한지 확인 하는 등의 역할 한다  // npm i class-validator class-transformer
  await app.listen(3000);
}
bootstrap();
