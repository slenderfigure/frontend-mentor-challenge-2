import { Component, OnInit } from '@angular/core';
import { LINK_LIST } from 'src/app/config/navigation-links.config';
import { MenuService } from '../mobile-menu/services/menu.service';

@Component({
  selector: 'spt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  linkList = LINK_LIST;
  menuState = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.menuState$.subscribe({
      next: state => this.menuState = state
    });
  }

  openMenu(e: MouseEvent): void {
    e.stopPropagation();
    this.menuService.changeMenuState(true);
  }

}
