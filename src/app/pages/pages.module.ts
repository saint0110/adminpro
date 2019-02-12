import { NgModule } from '@angular/core';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { ProgressComponent } from './progress/progress.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    // Utilizarlas fuera del modulo
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})
export class PagesModule { }
