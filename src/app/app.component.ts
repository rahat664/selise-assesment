import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {StudioComponent} from './pages/studio/studio.component';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'studio-boooking';
  studios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/Studios').subscribe(data => {
      this.studios = data;
    });
  }
}
