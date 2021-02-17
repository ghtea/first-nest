import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number):Movie {
        const movie = this.movies.find(movie=>movie.id === +id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        else {
            return movie;
        }
    }

    deleteOne(id:number){
        this.getOne(id);
        this.movies = this.movies.filter(movie=>movie.id!==id);
    }

    create(dataMovie: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...dataMovie,
        })
    }

    update(id: number, dataUpadate: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...dataUpadate});
    }
}
