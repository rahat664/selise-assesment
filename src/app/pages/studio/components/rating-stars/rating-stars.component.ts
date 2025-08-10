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

  get stars() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const diff = this.rating - i;
      if (diff >= 1) {
        stars.push(1); // full star
      } else if (diff > 0) {
        stars.push(diff); // partial star (fraction between 0 and 1)
      } else {
        stars.push(0); // empty star
      }
    }
    return stars;
  }

  getFill(i: number): string {
    const diff = this.rating - i;
    if (diff >= 1) return '100%';
    if (diff > 0) return `${diff * 100}%`;
    return '0%';
  }
}
