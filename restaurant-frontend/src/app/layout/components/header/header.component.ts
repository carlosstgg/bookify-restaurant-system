import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../../core/services/layout.service';
import { LucideAngularModule, Bell, Menu } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="header">
      <div class="left-section">
        <button class="icon-btn menu-btn" (click)="layoutService.toggleSidebar()">
          <lucide-icon [img]="MenuIcon" size="24"></lucide-icon>
        </button>
        <div class="page-title">
          <!-- We can update this dynamically later -->
          <h2>Overview</h2>
        </div>
      </div>
      
      <div class="header-actions">
        <!-- Notification bell placeholder -->
        <button class="icon-btn">
          <lucide-icon [img]="BellIcon" size="20"></lucide-icon>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 64px;
      flex-shrink: 0;
      background-color: white;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      position: sticky;
      top: 0;
      z-index: 20;

      @media (min-width: 1024px) {
        padding: 0 2rem;
      }
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .menu-btn {
      display: flex;
      
      @media (min-width: 1024px) {
        display: none !important;
      }
    }

    .page-title h2 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #111827;

      @media (min-width: 1024px) {
        font-size: 1.25rem;
      }
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background-color: #f3f4f6;
        color: #111827;
      }
    }
  `]
})
export class HeaderComponent {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);
  readonly BellIcon = Bell;
  readonly MenuIcon = Menu;
}
