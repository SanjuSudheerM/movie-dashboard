import {inject, TestBed} from '@angular/core/testing';

import {MoviesService} from './movies.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Movies} from '../../types/movie';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';

describe('MoviesService', () => {
  let service: MoviesService;
  const mockData = {
    'page': 1,
    'results': [{
      'adult': false,
      'backdrop_path': '/lOSdUkGQmbAl5JQ3QoHqBZUbZhC.jpg',
      'genre_ids': [53, 28, 878],
      'id': 775996,
      'original_language': 'en',
      'original_title': 'Outside the Wire',
      'overview': 'In the near future, a drone pilot is sent into a deadly militarized zone and must work with an android officer to locate a doomsday device.',
      'popularity': 720.578,
      'poster_path': '/6XYLiMxHAaCsoyrVo38LBWMw2p8.jpg',
      'release_date': '2021-01-15',
      'title': 'Outside the Wire',
      'video': false,
      'vote_average': 6.5,
      'vote_count': 1027
    }],
    'total_pages': 500,
    'total_results': 10000
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies from service', inject([HttpTestingController, MoviesService],
    (httpMock) => {
      service.apiKey = 'test-api-key';
      service.getPopularMovies(1).subscribe((res: Movies) => {
        expect(res).toBeDefined();
        expect(res.results.length).toEqual(1);
        expect(res.page).toEqual(1);
      });
      const api = 'test-api-key';
      const queryParams = `api_key=${api}&language=en-US&page=1`;
      const url = `${environment.SERVICE_BASE_URL}${environment.POPULAR_MOVIES}?${queryParams}`;
      const request = httpMock.expectOne(url);
      expect(request.request.method).toBe('GET');

      request.flush(mockData);
      httpMock.verify();
    }),
  );
});
