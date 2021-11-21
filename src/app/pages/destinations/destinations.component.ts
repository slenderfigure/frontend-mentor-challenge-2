import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Destination } from 'src/app/common/models/destination.model';
import { DestinationService } from 'src/app/common/services/destination.service';

@Component({
  selector: 'spt-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
  destinationList: string[] = [];
  destination!: Destination;
  loadingList = true;
  loadingDestination = true;
  targetDestinationName!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destiService: DestinationService
  ) { }

  ngOnInit(): void {
    /** Retrieve Destination List */
    this.destiService.getDestinationList().subscribe({
      next: list => {
        this.destinationList = list;
        this.loadingList = false;
      },
      error: (error: HttpErrorResponse) => console.error(error.message)
    })

    this.route.queryParamMap.pipe(
      tap({ next: () => this.loadingDestination = true }),
      switchMap(params => {
        this.targetDestinationName = params.get('name') || 'moon';
        return this.destiService.getDestinations();
      })
    ).subscribe({
      next: destinations => {
        this.destination = <Destination>destinations.find(desti => {
          return desti.name.toLowerCase() === this.targetDestinationName.toLowerCase();
        });
        this.loadingDestination = false;
      },
      error: (error: HttpErrorResponse) => console.error(error.message)
    });
  }

  changeDestination(name: string): void {
    this.router.navigate([ `/destination` ], {
      queryParams: { name: name.toLowerCase() }
    });
  }

}
