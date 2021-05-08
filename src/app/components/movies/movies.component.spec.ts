import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoviesComponent} from './movies.component';
import {MoviesService} from '../../services/movies/movies.service';
import {MockMovieService} from '../../../tests/mock-services/movies.service';
import {Movie} from '../../types/movie';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [SharedModule, RouterTestingModule],
      providers: [{provide: MoviesService, useClass: MockMovieService}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set variables on request', () => {
    component.ngOnInit();
    expect(component.movies).not.toBeNull();
    expect(component.pageNumber).toEqual(1);
    expect(component.totalPages).toEqual(10);
    expect(component.totalResults).toEqual(1000);
    expect(component.movies[0].title).toEqual('Mortal Kombat');
  });

  it('should add page number on scrolling down', () => {
    component.pageNumber = 1;
    component.totalPages = 2;
    component.fetchNextPage(true);
    expect(component.pageNumber).toEqual(2);
    expect(component.scrollDirection).toBeTruthy();
  });

  it('should reduce page number on scrolling up', () => {
    component.pageNumber = 2;
    component.totalPages = 2;
    component.fetchNextPage(false);
    expect(component.pageNumber).toEqual(1);
    expect(component.scrollDirection).not.toBeTruthy();
  });

  it('should remove movies from beginning if movies count exceeds MAX Count', () => {
    const results: Array<Movie> = [
      new Movie(1, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
      new Movie(2, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
      new Movie(3, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
      new Movie(4, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
    ];
    component.MAX_MOVIES_COUNT = 3;
    component.scrollDirection = true;
    component.updateMovieList(results);
    expect(component.movies.length).toEqual(component.MAX_MOVIES_COUNT);
    expect(component.movies[component.MAX_MOVIES_COUNT - 1].id).not.toEqual(3);
    expect(component.movies[0].id).not.toEqual(1);
    expect(component.movies[component.MAX_MOVIES_COUNT - 1].id).toEqual(4);
    expect(component.movies[0].id).toEqual(2);

  });

  it('should remove movies from starting when movies count exceeds MAX Count', () => {
    const results: Array<Movie> = [
      new Movie(1, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
      new Movie(2, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
      new Movie(3, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
      new Movie(4, 'Mortal Kombat', '2021-10-12', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg'),
    ];
    component.MAX_MOVIES_COUNT = 3;
    component.scrollDirection = false;
    component.updateMovieList(results);
    expect(component.movies.length).toEqual(component.MAX_MOVIES_COUNT);
    expect(component.movies[component.MAX_MOVIES_COUNT - 1].id).not.toEqual(4);
    expect(component.movies[0].id).not.toEqual(2);
    expect(component.movies[component.MAX_MOVIES_COUNT - 1].id).toEqual(3);
    expect(component.movies[0].id).toEqual(1);

  });
});
