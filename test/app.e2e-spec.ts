import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach로 하면, create app for each test (npm start 에서 만드는 앱과 다른것!)
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 실제 앱에 쓰이는 것과 똑같이 해야 한다!
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // 에러메시지에서 잘못된 거에 대해 설명 해준다
      transform: true, // 사용자에게서 오는 데이터를 우리가 원하는 타입(타입스크립트 코드로 판단)으로 바꿔준다 // 쿼리는 항상 string 인데 이걸 자동으로 숫자등으로 바꿔준다
    }));  // 쿼리 유효한지 확인 하는 등의 역할 한다  // npm i class-validator class-transformer
    
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movies api');
  });

  describe("/movies", ()=>{
    it("GET", ()=>{
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([])
    });
  
    it("POST 201", ()=>{
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201)
    });
    it("POST 400", ()=>{
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'thing'
        })
        .expect(400)
    });

    it("DELETE", ()=>{
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    })
  });

  describe('/movies/:id', ()=>{
    it('GET 200', ()=>{
      return request(app.getHttpServer())
      .get('/movies/1') // 위의 POST 에서 이미 만들었다
      .expect(200);
    });
    it('GET 404', ()=>{
      return request(app.getHttpServer())
      .get('/movies/999') // 위의 POST 에서 이미 만들었다
      .expect(404);
    });
    it('PATCH 200', ()=>{
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({title: "Updated Test"})
        .expect(200);
      })
    it('DELETE 200', ()=>{
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });
  })
  
});
