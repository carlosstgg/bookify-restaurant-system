import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
        { path: '', component: DashboardComponent },
        { 
          path: 'employees', 
          loadComponent: () => import('./features/admin/employees/employees.component').then(m => m.EmployeesComponent) 
        },
        {
          path: 'menu',
          loadComponent: () => import('./features/admin/menu').then(m => m.MenuComponent)
        },
        {
          path: 'tables',
          loadComponent: () => import('./features/admin/tables/tables.component').then(m => m.TablesComponent)
        },
        {
          path: 'orders',
          loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent)
        },
        {
          path: 'kitchen',
          loadComponent: () => import('./features/kitchen/kitchen.component').then(m => m.KitchenComponent), // Kitchen KDS
          data: { roles: ['chef', 'manager'] }
        },
    ] 
  },
  { path: '**', redirectTo: '' }
];
