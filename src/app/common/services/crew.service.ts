import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Controllers } from '../backend-controllers/controllers.enum';
import { Crew } from '../models/crew.model';

@Injectable({ providedIn: 'root' })
export class CrewService {
  
  constructor(private http: HttpClient) {}

  private getCrewMembers(): Observable<Crew[]> {
    const URL = `${env.API}/${Controllers.CREW}.json`;
    return this.http.get<Crew[]>(URL);
  }

  getCrewList(): Observable<number[]> {
    return this.getCrewMembers().pipe(map(crew => {
      return crew.map(member => member.id);
    }));
  }

  getMember(id: number): Observable<Crew> {
    return this.getCrewMembers().pipe(map(crew => {
      return <Crew>crew.find(member => member.id === id);
    }));
  }
  
}