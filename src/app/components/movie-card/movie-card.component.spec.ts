import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieCardComponent} from './movie-card.component';
import {Movie} from '../../types/movie';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.movie = new Movie(1, 'Dark Knight', '2021-10-11', '/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set posterImage', () => {
    const backgroundImage = compiled.querySelector('.movie-card').style.backgroundImage;
    expect(backgroundImage).toContain(component.movie.posterImage);
  });

  it('should set movie name', () => {
    const titleText = compiled.querySelector('h3.title-text').textContent;
    expect(titleText).toEqual(component.movie.title);
  });

  it('should set movie released year', () => {
    const year = compiled.querySelector('span.small-text').textContent;
    expect(year).toEqual(component.movie.releasedYear.toString());
  });
});
