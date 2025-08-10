import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  imports: [CommonModule],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.scss'
})
export class RatingStarsComponent {
  @Input() rating = 0;

  get starsArray() {
    return Array(Math.round(this.rating)).fill(0);
  }
}
