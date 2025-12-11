import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/auth.models';
import { 
  LucideAngularModule, 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  ClipboardList, 
  Armchair,
  Settings,
  LogOut,
  Calendar
} from 'lucide-angular';

interface MenuItem {
  label: string;
  icon: any;
  route: string;
  roles: UserRole[];
}

import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);
  
  readonly menuItems: MenuItem[] = [
    { 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      route: '/', 
      roles: ['manager'] 
    },
    { 
      label: 'Orders', 
      icon: ClipboardList, 
      route: '/orders', 
      roles: ['waiter', 'general_assistant', 'manager', 'chef'] 
    },
    { 
      label: 'Tables', 
      icon: Armchair, 
      route: '/tables', 
      roles: ['waiter', 'general_assistant', 'manager'] 
    },
    { 
      label: 'Reservations', 
      icon: Calendar, 
      route: '/reservations', 
      roles: ['waiter', 'general_assistant', 'manager'] 
    },
    { 
      label: 'Menu & Inventory', 
      icon: UtensilsCrossed, 
      route: '/menu', 
      roles: ['manager', 'general_assistant', 'chef'] 
    },
    { 
      label: 'Kitchen', 
      icon: UtensilsCrossed, 
      route: '/kitchen', 
      roles: ['chef', 'manager'] 
    },
    { 
      label: 'Employees', 
      icon: Users, 
      route: '/employees', 
      roles: ['manager'] 
    },
  ];

  readonly bottomItems: MenuItem[] = [
    // { label: 'Settings', icon: Settings, route: '/settings', roles: ['manager'] }
  ];

  // Icons for binding
  readonly LogOutIcon = LogOut;

  hasAccess(allowedRoles: UserRole[]): boolean {
    const user = this.authService.currentUser();
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }

  logout() {
    this.authService.logout();
  }
}
