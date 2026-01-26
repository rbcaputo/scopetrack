import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page/dashboard-page.component';
import { ClientsPageComponent } from './features/clients/pages/clients-page/clients-page.component';
import { ContractsPageComponent } from './features/contract/pages/contracts-page/contracts-page/contracts-page.component';

export const routes: Routes = [
  {
    path: "",
    component: DashboardPageComponent
  },
  {
    path: "clients",
    component: ClientsPageComponent
  },
  {
    path: "contracts",
    component: ContractsPageComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];
