import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-amenities-list',
  imports: [CommonModule],
  templateUrl: './amenities-list.component.html',
  styleUrl: './amenities-list.component.scss'
})
export class AmenitiesListComponent {
  @Input() amenities: string[] = [];
}
