import {environment} from '../../environments/environment';

export interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Array<MovieType>;
  total_pages: number;
  total_results: number;
}

export class Movie {
  id: number;
  title: string;
  releasedYear: number;
  posterImage: string;

  constructor(id: number, title: string, releasedDate: string, posterImage: string) {
    this.id = id;
    this.title = title;
    this.releasedYear = new Date(releasedDate).getFullYear();
    this.posterImage = `${environment.IMAGE_BASE_URL}${posterImage}`;
  }
}

export interface Movies {
  page: number;
  results: Array<Movie>;
  totalPages: number;
  totalResults: number;
}
