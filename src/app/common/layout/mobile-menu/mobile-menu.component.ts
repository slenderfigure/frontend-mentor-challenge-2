import { Component, HostListener, OnInit } from '@angular/core';
import { LINK_LIST } from 'src/app/config/navigation-links.config';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'spt-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  linkList = LINK_LIST;
  menuState = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.menuState$.subscribe({
      next: state => {
        this.menuState = state;
        
        (!this.menuState) 
          ? document.body.removeAttribute('active-menu')
          : document.body.setAttribute('active-menu', '');
      }
    });
  }

  closeMenu(): void {
    document.body.removeAttribute('active-menu');
    this.menuService.changeMenuState(false);
  }

  @HostListener('window:click', ['$event'])
  onClickOutSide(e: MouseEvent): void {
    if (!this.menuState) return;

    const target = <HTMLElement>e.target;

    if (!target.closest('.mobile-menu')) this.closeMenu();
  }

  @HostListener('window:keyup', ['$event'])
  onEscKeyPressed(e: KeyboardEvent): void {
    if (!this.menuState || e.key !== 'Escape') return;
    this.closeMenu();
  }

  @HostListener('window:resize') onWindowResize(): void {
    if (window.innerWidth > 550) this.closeMenu();
  }
}
