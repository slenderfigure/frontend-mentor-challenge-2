import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Controllers } from '../backend-controllers/controllers.enum';
import { HomePage } from '../models/home.model';

@Injectable({ providedIn: 'root' })
export class PageDetailsService {
  
  constructor(private http: HttpClient) {}

  getHomePageDetails(): Observable<HomePage> {
    const URL = `${env.API}/${Controllers.HOME}.json`;
    return this.http.get<HomePage>(URL);
  }

}