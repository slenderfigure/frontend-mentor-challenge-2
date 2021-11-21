import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Controllers } from '../backend-controllers/controllers.enum';
import { Destination } from '../models/destination.model';

@Injectable({ providedIn: 'root' })
export class DestinationService {
  
  constructor(private http: HttpClient) {}

  getDestinationList(): Observable<string[]> {
    return this.getDestinations().pipe(map(destinations => {
      return destinations.map(destination => destination.name.toLowerCase());
    }));
  }

  getDestinations(): Observable<Destination[]> {
    const URL = `${env.API}/${Controllers.DESTINATION}.json`;
    return this.http.get<Destination[]>(URL);
  }
  
}