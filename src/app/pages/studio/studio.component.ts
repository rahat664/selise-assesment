import { Component } from '@angular/core';
import {StudioListComponent} from './components/studio-list/studio-list.component';

@Component({
  selector: 'app-studio',
  imports: [
    StudioListComponent
  ],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss'
})
export class StudioComponent {

}
