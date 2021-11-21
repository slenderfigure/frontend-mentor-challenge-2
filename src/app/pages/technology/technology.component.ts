import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs';
import { Technology } from 'src/app/common/models/technology.model';
import { TechnologyService } from 'src/app/common/services/technology.service';

@Component({
  selector: 'spt-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {
  technologyList: number[] = [];
  technology!: Technology;
  loadingList = true;
  loadingTechnology = true;
  targetTechId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private techService: TechnologyService
  ) { }

  ngOnInit(): void {
    /** Retrieve Destination List */
    this.techService.getTechnologyList().subscribe({
      next: list => {
        this.technologyList = list;
        this.loadingList = false;
      },
      error: (error: HttpErrorResponse) => console.error(error.message)
    })

    this.route.queryParamMap.pipe(
      tap({ next: () => this.loadingTechnology = true }),
      switchMap(params => {
        this.targetTechId = +(params?.get('id') || 2345);
        return this.techService.getTechnologies();
      })
    ).subscribe({
      next: technologies => {
        this.technology = <Technology>technologies.find(tech => {
          return tech.id === this.targetTechId;
        });
        this.loadingTechnology = false;
      },
      error: (error: HttpErrorResponse) => console.error(error.message)
    });
  }

  get technolgyImgSrcset(): string {
    return `${this.technology.images.landscape} 800w,
            ${this.technology.images.portrait}`;
  }

  get technolgyImgSizes(): string {
    return `(max-width: 800px) 800px,
            1440px`;
  }

  changeTechnology(id: number): void {
    this.router.navigate([ `/technology` ], {queryParams: { id } });
  }

}
