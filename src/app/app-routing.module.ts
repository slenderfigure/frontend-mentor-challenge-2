import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewComponent } from './pages/crew/crew.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TechnologyComponent } from './pages/technology/technology.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'destination',
    component: DestinationsComponent,
    data: { title: 'Destination' }
  },
  {
    path: 'crew',
    component: CrewComponent,
    data: { title: 'Crew' }
  },
  {
    path: 'technology',
    component: TechnologyComponent,
    data: { title: 'Technology' }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: '404 - Not Found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
