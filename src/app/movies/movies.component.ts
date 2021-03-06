import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './services/movie.models';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
    movies: Movie[] = [];
    moviesBase: Movie[] = [];
    
    constructor(private movieService: MovieService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const genre = this.route.snapshot.paramMap.get('genre');

        this.movieService.getMovies().subscribe(response => {
            this.movies = response;

            if(genre){
                this.moviesBase = response;
                this.route.params.subscribe(routeParams => {
                    this.updateGenre(routeParams['genre']);
                });
            }

        });
    }

    updateGenre(genre: any): void {
        this.movies = this.moviesBase;
        if(Number(genre)){
            this.movies = this.movies.filter(movie => movie.genres.find(g => g.id === Number(genre)))
        }
        else {
            this.movies = this.movies.filter(movie => movie.genres.find(g => g.name === genre))
        }
    }

}
