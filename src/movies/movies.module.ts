import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService],   // NestJS 가 MoviesService를 import해서  controller에 inject한다   'dependency injection'
})
export class MoviesModule {}
