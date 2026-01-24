import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/dashboard/pages/dashboard-page/dashboard-page.component")
      .then(m => m.DashboardPageComponent)
  },
  {
    path: "clients",
    loadComponent: () => import("./features/clients/pages/clients-page/clients-page.component")
      .then(m => m.ClientsPageComponent)
  },
  {
    path: "contracts",
    loadComponent: () => import("./features/contract/pages/contracts-page/contracts-page/contracts-page.component")
      .then(m => m.ContractsPageComponent)
  },
  {
    path: "**",
    redirectTo: ""
  }
];
