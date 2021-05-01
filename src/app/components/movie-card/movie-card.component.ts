import {Component, Input} from '@angular/core';
import {Movie} from '../../types/movie';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  imageBaseURL: string = environment.IMAGE_BASE_URL;
  @Input() movie: Movie;

}
