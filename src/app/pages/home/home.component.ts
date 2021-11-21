import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/common/models/home.model';
import { PageDetailsService } from 'src/app/common/services/page-details.service';

@Component({
  selector: 'spt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageDetails!: HomePage;
  loadingData = true;

  constructor(private detailService: PageDetailsService) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.detailService.getHomePageDetails().subscribe({
      next: details => this.pageDetails = details,
      error: (error: HttpErrorResponse) => console.error(error.message)
    }).add(() => this.loadingData = false);
  }

}
