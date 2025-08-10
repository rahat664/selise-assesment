import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import {Observable} from 'rxjs';
import db from '../../assets/db.json'; // Import JSON directly

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    return db; // Return the JSON data as the in-memory database
  }

}
