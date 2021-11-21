import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Controllers } from '../backend-controllers/controllers.enum';
import { Technology } from '../models/technology.model';

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  
  constructor(private http: HttpClient) {}

  getTechnologyList(): Observable<number[]> {
    return this.getTechnologies().pipe(map(technologies => {
      return technologies.map(technology => technology.id);
    }));
  }

  getTechnologies(): Observable<Technology[]> {
    const URL = `${env.API}/${Controllers.TECHNOLOGY}.json`;
    return this.http.get<Technology[]>(URL);
  }
  
}