import {Component, OnInit} from '@angular/core';
import {Movie, Movies} from '../../types/movie';
import {MoviesService} from '../../services/movies/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie> = [];
  pageNumber = 1;
  totalPages = 0;
  totalResults = 0;
  scrollDirection: boolean;
  MAX_MOVIES_COUNT = 140; // TODO: update this on small devices

  constructor(public movieService: MoviesService) {
  }

  ngOnInit(): void {
    this.getPopularMovies();
  }

  /**
   * Triggering scroll hit at the marked positions
   * @param {boolean} isScrollingDown - True - Scrolling downward , False - Scrolling Upward
   */
  public fetchNextPage(isScrollingDown: boolean): void {
    isScrollingDown ? this.pageNumber += 1 : this.pageNumber -= 1;
    this.scrollDirection = isScrollingDown;
    if ((this.pageNumber <= this.totalPages && isScrollingDown) || (this.pageNumber > 0 && !isScrollingDown)) {
      this.getPopularMovies();
    }
  }

  /**
   * Fetching the movies from service
   * @private
   */
  private getPopularMovies(): void {
    this.movieService.getPopularMovies(this.pageNumber).subscribe(
      (res: Movies) => {
        this.totalPages = res.totalPages;
        this.totalResults = res.totalResults;
        this.updateMovieList(res.results);
      }
    );
  }

  /**
   * Checking the total no.of movies in the dom
   * Keeping only 7 pages movies at a time (7 x 20),
   * cleaning rest of the movies based on the scroll direction
   * @param {Array<Movie>} results
   * @private
   */
  updateMovieList(results: Array<Movie>): void {
    this.movies = this.scrollDirection ? [...this.movies, ...results] : [...results, ...this.movies];
    if (this.movies.length > this.MAX_MOVIES_COUNT) {
      const excessMoviesCount = this.movies.length - this.MAX_MOVIES_COUNT;
      this.scrollDirection ? this.movies.splice(0, excessMoviesCount) : this.movies.splice(this.MAX_MOVIES_COUNT, excessMoviesCount);
    }
  }


}
