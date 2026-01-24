import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStatsDto } from '../models/dashboard-stats.dto';
import { DashboardService } from '../services/dashboard.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  public stats$!: Observable<DashboardStatsDto>;

  constructor(private readonly dashboardService: DashboardService) { }
  ngOnInit(): void {
    this.stats$ = this.dashboardService.getStats();
  }
}
