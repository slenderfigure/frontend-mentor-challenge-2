import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothImageLoadingDirective } from './smooth-image-loading.directive';

@NgModule({
  declarations: [
    SmoothImageLoadingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SmoothImageLoadingDirective
  ]
})
export class SharedModule { }
