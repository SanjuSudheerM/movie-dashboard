import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Movie, MovieResponse, Movies, MovieType} from '../../types/movie';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiKey: string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.apiKey = this.route.snapshot.queryParamMap.get('apiKey');
    console.log(this.route.snapshot.paramMap.get('apiKey'));
  }

  /**
   * Fetching the popular movies from the service
   * @param {number} page
   * @param {string} language default language has been set to English
   */
  getPopularMovies(page: number, language: string = 'en-US'): Observable<Movies> {

    const queryParams = `api_key=${this.apiKey}&language=${language}&page=${page}`;
    return this.httpClient.get(`${environment.SERVICE_BASE_URL}${environment.POPULAR_MOVIES}?${queryParams}`)
      .pipe(map((movies: MovieResponse) => this.mapMovies(movies)));
  }

  /**
   * Mapping the service response to Movie type
   * @param {MovieResponse} movies
   * @private
   */
  private mapMovies(movies: MovieResponse): Movies {
    const results = movies.results.map(
      (movie: MovieType) => new Movie(
        movie.id,
        movie.original_title,
        movie.release_date,
        movie.poster_path)
    );
    return {page: movies.page, totalPages: movies.total_pages, totalResults: movies.total_results, results};
  }
}
