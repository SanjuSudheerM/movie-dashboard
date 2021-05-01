import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoviesComponent} from './movies.component';
import {MoviesService} from '../../services/movies/movies.service';
import {MockMovieService} from '../../../tests/mock-services/movies.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
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
});
