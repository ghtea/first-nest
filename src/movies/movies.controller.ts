import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll(){
        return "This will return all movies"
    }

    @Get('/:id')
    getOne(@Param('id') idMovie:string ){
        return `This will return one movie ${idMovie}`;
    }

    @Post()
    create(){
        return `This will create a movie`;
    }

    @Delete('/:id')
    remove(@Param('id') idMovie:string){
        return `This will delete a movie with the id: ${idMovie}`;
    }

    @Patch('/:id')
    patch(@Param('id') idMovie:string){
        return `This will patch a movie with the id: ${idMovie}`;
    }
}
