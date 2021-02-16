import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll():Movie[]{
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') idMovie:string ):Movie{
        return this.moviesService.getOne(idMovie);
    }

    @Post()
    create(@Body() dataMovie){
        return this.moviesService.create(dataMovie);
    }

    @Delete('/:id')
    remove(@Param('id') idMovie:string){
        return this.moviesService.deleteOne(idMovie);
    }

    @Patch('/:id')
    patch(@Param('id') idMovie:string, @Body() dataUpdate){
        return {
            idMovieUpdated: idMovie,
            ...dataUpdate,
        }
    }

}
