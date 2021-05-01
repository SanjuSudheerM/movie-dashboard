import {BehaviorSubject, Observable} from 'rxjs';
import {Movie, Movies} from '../../app/types/movie';

export class MockMovieService {
  mockData: Movies = {
    page: 1,
    results: [new Movie(460465, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg')],
    totalPages: 10,
    totalResults: 1000
  };
  mockDataObservable = new BehaviorSubject<Movies>(this.mockData);

  getPopularMovies(): Observable<Movies> {
    return this.mockDataObservable.asObservable();
  }
}
