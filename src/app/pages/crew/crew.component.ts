import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Crew } from 'src/app/common/models/crew.model';
import { CrewService } from 'src/app/common/services/crew.service';

@Component({
  selector: 'spt-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {
  memberId!: number;
  member!: Crew;
  crewList: number[] = [];
  loadingCrewList = true;
  loadingCrewMember = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crewService: CrewService
  ) { }

  ngOnInit(): void {
    this.crewService.getCrewList().subscribe({
      next: list => {
        this.crewList = list;
        this.loadingCrewList = false;
      },
      error: (error: HttpErrorResponse) => console.error(error.message)
    })

    this.route.queryParamMap.pipe(
      tap({ next: () => this.loadingCrewMember = true }),
      switchMap(params => {
        this.memberId = +(params.get('id') || 1001);
        return this.crewService.getMember(this.memberId);
      })
    ).subscribe({
      next: member => {
        this.member = this.member = member;
        this.loadingCrewMember = false;
      },
      error: (error: HttpErrorResponse) => console.error(error.message)
    });
  }

  changeCrewMember(id: number): void {
    this.router.navigate([ `/crew` ], { queryParams: { id } });
  }
}
