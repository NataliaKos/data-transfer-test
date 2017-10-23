import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats/stats.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: 'stats',
    children: [],
    component: StatsComponent
  },
  {
    path: 'report',
    children: [],
    component: ReportComponent
  },
  { 
    path: '**',
    redirectTo: '/stats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
