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
  fetchedPageNumber: number;
  scrollDirection: boolean;
  MAX_MOVIES_COUNT = 40; // TODO: update this on small devices
  viewCalculation: {
    itemsPerRow: number,
    itemsPerCol: number, scrollBuffer: number,
    availableWidth: number, availableHeight: number,
    itemsPerColFraction?: number
  };
  isRequestInProgress = false;
  apiKey: string;

  constructor(public movieService: MoviesService) {
  }

  ngOnInit(): void {
    this.calculateView();
    this.getPopularMovies();
  }

  /**
   * Triggering scroll hit at the marked positions
   * @param {boolean} isScrollingDown - True - Scrolling downward , False - Scrolling Upward
   */
  public fetchNextPage(isScrollingDown: boolean): void {
    if (!this.isRequestInProgress) {
      isScrollingDown ? this.pageNumber += 1 : this.pageNumber -= 1;
      if (this.scrollDirection !== isScrollingDown && !isScrollingDown) {
        this.pageNumber -= 1;
      }
      this.scrollDirection = isScrollingDown;
      if (
        ((this.pageNumber <= this.totalPages && isScrollingDown) ||
          (this.pageNumber > 0 && !isScrollingDown)) &&
        this.pageNumber !== this.fetchedPageNumber
      ) {
        this.getPopularMovies();
      } else {
        this.pageNumber = this.fetchedPageNumber;
      }
    }
  }

  /**
   * Fetching the movies from service
   * @private
   */
  private getPopularMovies(): void {
    this.isRequestInProgress = true;
    this.movieService.getPopularMovies(this.pageNumber).subscribe(
      (res: Movies) => {
        this.fetchedPageNumber = res.page;
        this.totalPages = res.totalPages;
        this.totalResults = res.totalResults;
        if (this.pageNumber < 3) {
          this.updateFraction();
        }
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
      document.querySelector('.container-movie').scrollTop =
        this.scrollDirection ?
          (this.viewCalculation.itemsPerColFraction * 400) + this.viewCalculation.scrollBuffer :
          (this.viewCalculation.itemsPerColFraction * 400) - this.viewCalculation.scrollBuffer;
    }
    this.isRequestInProgress = false;
    console.log('adding and removing', this.pageNumber, this.movies.length);
  }

  calculateView(): void {
    /**
     * container is 90%
     */
    const availableWidth = window.innerWidth * 0.9;
    /**
     * removing the header and top margin
     */
    const availableHeight = window.innerHeight - 97;

    /**
     * Min width for movie card is 250px
     */
    const itemsPerRow = Math.ceil(availableWidth / 250);
    /**
     * Height of movie card is 400px
     */
    const itemsPerCol = Math.floor(availableHeight / 400);
    /**
     * Available space after showing the number of full card on the view
     */
    const scrollBuffer = availableHeight - (itemsPerCol * 400);

    this.viewCalculation = {itemsPerRow, itemsPerCol, scrollBuffer, availableHeight, availableWidth};
    console.log(this.viewCalculation, this.MAX_MOVIES_COUNT);
    this.updateFraction();
  }

  updateFraction(): void {
    const scrollHeight = document.querySelector('.container-movie').scrollHeight;
    const availableDistanceToTrigger = scrollHeight - this.viewCalculation.availableHeight - this.viewCalculation.scrollBuffer;
    const itemsPerColFraction = availableDistanceToTrigger / (400 + 30);
    this.viewCalculation.itemsPerColFraction = itemsPerColFraction;
    console.log(this.viewCalculation);
  }

}
