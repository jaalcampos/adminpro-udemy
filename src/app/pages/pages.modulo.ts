import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.modulo';
import { PAGES_ROUTES } from './pages.routes';
import {FormsModule} from '@angular/forms'
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficodonaComponent} from '../components/graficodona/graficodona.component';
import { PromesasComponent} from './promesas/promesas.component'

// ng2 - charts
import {ChartsModule} from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({

    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficodonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        BrowserModule
    ]

})

export class PagesModule {

}