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
        { 
          path: '', 
          component: DashboardComponent,
          data: { roles: ['manager'] }
        },
        { 
          path: 'employees', 
          loadComponent: () => import('./features/admin/employees/employees.component').then(m => m.EmployeesComponent),
          data: { roles: ['manager'] } 
        },
        {
          path: 'menu',
          loadComponent: () => import('./features/admin/menu').then(m => m.MenuComponent),
          data: { roles: ['manager', 'general_assistant', 'chef'] }
        },
        {
          path: 'tables',
          loadComponent: () => import('./features/admin/tables/tables.component').then(m => m.TablesComponent),
          data: { roles: ['manager', 'waiter', 'general_assistant'] }
        },
        {
          path: 'orders',
          loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),
          data: { roles: ['manager', 'waiter', 'general_assistant', 'chef'] }
        },
        {
          path: 'reservations',
          loadComponent: () => import('./features/admin/reservations/reservations.component').then(m => m.ReservationsAdminComponent),
          data: { roles: ['manager', 'waiter', 'general_assistant'] }
        },
        {
          path: 'kitchen',
          loadComponent: () => import('./features/kitchen/kitchen.component').then(m => m.KitchenComponent),
          data: { roles: ['manager', 'chef'] }
        },
    ] 
  },
  { path: '**', redirectTo: '' }
];
