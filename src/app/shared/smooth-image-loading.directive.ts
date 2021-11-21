import {
  Directive,
  ElementRef,
  HostListener,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[smooth-image-loading]'
})
export class SmoothImageLoadingDirective implements OnInit {
  private image!: HTMLImageElement; 

  constructor(private ele: ElementRef<HTMLImageElement>) { }

  ngOnInit(): void {
    this.image = this.ele.nativeElement;
    this.setLoadingStyle();
  }

  private setLoadingStyle(): void {
    this.image.style.opacity = '0';
    this.image.style.transition = 'opacity .6s cubic-bezier(0.22, 1, 0.36, 1)';
  }

  private revealImage(): void {
    this.image.style.opacity = '1';
  }

  private cleanImageTag(): void {
    this.image.removeAttribute('style');
  }

  @HostListener('load') onLoad(): void {
    const interval = setInterval(() => {
      if (this.image.naturalWidth > 0 && this.image.naturalHeight > 0) {
        this.revealImage();
        clearInterval(interval);
      }
    }, 10);
  }

  @HostListener('transitionend', ['$event']) 
  animationEnd(e: TransitionEvent): void {
    if (e.propertyName !== 'opacity') return;
    this.cleanImageTag();
  }

}
