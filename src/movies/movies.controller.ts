import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
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
    getOne(@Param('id') idMovie:number ):Movie{
        return this.moviesService.getOne(idMovie);
    }

    @Post()
    create(@Body() dataMovie: CreateMovieDto){
        return this.moviesService.create(dataMovie);
    }

    @Delete('/:id')
    remove(@Param('id') idMovie:number){
        return this.moviesService.deleteOne(idMovie);
    }

    @Patch('/:id')
    patch(@Param('id') idMovie:number, @Body() dataUpdate: UpdateMovieDto){
        return this.moviesService.update(idMovie, dataUpdate);
    }

}
