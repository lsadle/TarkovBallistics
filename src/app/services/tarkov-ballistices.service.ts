import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BallisticReport } from '../models/ballistic-report';

@Injectable({
  providedIn: 'root'
})
export class TarkovBallisticesService {

  constructor(private client: HttpClient) { }

  getBallisticReports(): Observable<Map<string, BallisticReport[]>> {
    return this.client.get('https://escapefromtarkov.fandom.com/wiki/Ballistics', { responseType: 'text' }).pipe(map(results => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(results, 'text/html');
      const table = doc.getElementById('trkballtable');
      const rows = table.getElementsByTagName('tr');

      const fullReport = new Map<string, BallisticReport[]>();
      let caliberArray: BallisticReport[];
      let lastId: string;

      // Skip header rows
      // tslint:disable-next-line:prefer-for-of
      for (let i = 3; i < rows.length; i++) {
        const row = rows[i];
        // Start of new section / end of last section
        if (row.id) {
          if (lastId) {
            fullReport.set(lastId, caliberArray);
          }
          lastId = row.id.replace('_anchor', '').split('_').join(' ');
          caliberArray = [];
        }

        const report = new BallisticReport();
        const cells = row.getElementsByTagName('td');
        const startIndex = (row.id) ? 1 : 0;

        report.caliber = lastId;
        report.name = cells[startIndex + 0].getElementsByTagName('a')[0].innerText.replace('\n', '');
        report.damage = cells[startIndex + 1].innerText.replace('\n', '');
        report.penetrationPower = cells[startIndex + 2].innerText.replace('\n', '');
        report.armorDamagePercent = cells[startIndex + 3].innerText.replace('\n', '');
        report.accuracyPercent = cells[startIndex + 4].innerText.replace('\n', '');
        report.recoilPercent = cells[startIndex + 5].innerText.replace('\n', '');
        report.fragChance = cells[startIndex + 6].innerText.replace('\n', '');
        report.bleedLow = cells[startIndex + 6].innerText.replace('\n', '');
        report.bleedHigh = cells[startIndex + 8].innerText.replace('\n', '');
        report.class1 = cells[startIndex + 9].innerText.replace('\n', '');
        report.class2 = cells[startIndex + 10].innerText.replace('\n', '');
        report.class3 = cells[startIndex + 11].innerText.replace('\n', '');
        report.class4 = cells[startIndex + 12].innerText.replace('\n', '');
        report.class5 = cells[startIndex + 13].innerText.replace('\n', '');
        report.class6 = cells[startIndex + 14].innerText.replace('\n', '');

        caliberArray.push(report);
      }

      // Add last row
      fullReport.set(lastId, caliberArray);
      return fullReport;
    }));
  }
}
