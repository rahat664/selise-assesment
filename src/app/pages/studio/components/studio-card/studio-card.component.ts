import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {AmenitiesListComponent} from '../amenities-list/amenities-list.component';
import {RatingStarsComponent} from '../rating-stars/rating-stars.component';

@Component({
  selector: 'app-studio-card',
  imports: [
    CurrencyPipe,
    CommonModule,
    AmenitiesListComponent,
    RatingStarsComponent
  ],
  templateUrl: './studio-card.component.html',
  styleUrl: './studio-card.component.scss'
})
export class StudioCardComponent {
  @Input() studio: any;
  @Output() book = new EventEmitter<any>();
}
