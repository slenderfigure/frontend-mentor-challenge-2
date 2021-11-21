import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/layout/navbar/navbar.component';
import { MobileMenuComponent } from './common/layout/mobile-menu/mobile-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { CrewComponent } from './pages/crew/crew.component';
import { TechnologyComponent } from './pages/technology/technology.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MobileMenuComponent,
    HomeComponent,
    DestinationsComponent,
    CrewComponent,
    TechnologyComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
