import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { MenuService } from './common/layout/mobile-menu/services/menu.service';
import { BackgroundImage, PageBackgroundImage } from './common/models/page-background-image.model';
import { BACKGROUND_IMAGES } from './config/page-background-imgs.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private pageTitleSuffix = 'Space Tourism';
  private backgroundImages = BACKGROUND_IMAGES;
  backgroundImage!: BackgroundImage;
  loading = true;

  constructor(
    private router: Router,
    private title: Title,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.updatePageDetails();
  }

  private updatePageDetails(): void {
    this.router.events.pipe(
      filter(e => e instanceof ActivationEnd),
      tap({ next: () => this.loading = true}),
      map(route => (<ActivationEnd>route).snapshot.data['title'])
    )
    .subscribe((title: string) => {
      /** Set Page Title */
      this.title.setTitle(`${title} | ${this.pageTitleSuffix}`);

      /** Set Page Background Image */
      const key = title.toLowerCase() as keyof PageBackgroundImage;
      this.backgroundImage = this.backgroundImages[key];

      /** Close Out Mobile Menu if open */
      this.menuService.changeMenuState(false);

      this.loading = false;
    });
  }

  get backgroundImageSrcset (): string {
    return `${this.backgroundImage.mobile} 375w,
            ${this.backgroundImage.tablet} 768w,
            ${this.backgroundImage.desktop} 1440w`;
  }

  get backgroundImageSizes(): string {
    return `(max-width: 375px) 375px,
            (max-width: 768px) 768px,
            1440px`;
  }

}
