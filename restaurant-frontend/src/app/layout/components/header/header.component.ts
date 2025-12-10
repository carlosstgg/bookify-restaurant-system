import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule, Bell } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="header">
      <div class="page-title">
        <!-- We can update this dynamically later -->
        <h2>Overview</h2>
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
      padding: 0 2rem;
    }

    .page-title h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
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
      
      &:hover {
        background-color: #f3f4f6;
        color: #111827;
      }
    }
  `]
})
export class HeaderComponent {
  authService = inject(AuthService);
  readonly BellIcon = Bell;
}
