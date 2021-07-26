import { Component, OnInit } from '@angular/core';
import { TarkovBallisticesService } from './services/tarkov-ballistices.service';
import { BallisticReport } from './models/ballistic-report';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['name', 'damage', 'class1', 'class2', 'class3', 'class4', 'class5', 'class6'];
  title = 'Tarkov Ballistics';
  loading = true;
  report: Map<string, BallisticReport[]>;

  calibers: string[] = [];
  selectedCaliber: string;
  selectedReports: BallisticReport[] = [];

  constructor(private service: TarkovBallisticesService) {

  }

  ngOnInit(): void {
    this.service.getBallisticReports().subscribe((report) => {
      this.report = report;
      this.loading = false;
      this.calibers = Array.from(report.keys());
      this.selectedCaliber = this.calibers[0];
      this.selectedReports = report.get(this.selectedCaliber);
    });
  }

  onSelectionChange(selected: string): void {
    this.selectedReports = this.report.get(this.selectedCaliber);
  }
}
