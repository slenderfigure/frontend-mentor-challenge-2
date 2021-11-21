import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuStateSource = new BehaviorSubject<boolean>(false);
  menuState$ = this.menuStateSource.asObservable();

  constructor() { }

  changeMenuState(state: boolean): void {
    this.menuStateSource.next(state);
  }
}