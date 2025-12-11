import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../../core/services/layout.service';
import { LucideAngularModule, Bell, Menu, Github } from 'lucide-angular';

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
        <!-- Author info dropdown -->
        <div class="relative">
          <button class="icon-btn" (click)="toggleDropdown()" [class.active]="isDropdownOpen()">
            <lucide-icon [img]="BellIcon" size="20"></lucide-icon>
          </button>
          
          <div *ngIf="isDropdownOpen()" class="dropdown-menu">
            <div class="dropdown-content">
              <span class="author-text">Made by <strong>Carlos Gallegos</strong></span>
              <a href="https://github.com/carlosstgg" target="_blank" class="github-link" title="Visit GitHub Profile">
                <lucide-icon [img]="GithubIcon" size="18"></lucide-icon>
              </a>
            </div>
          </div>
          
          <!-- Overlay to close dropdown when clicking outside -->
          <div *ngIf="isDropdownOpen()" class="dropdown-overlay" (click)="isDropdownOpen.set(false)"></div>
        </div>
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
      align-items: center;
    }
    
    .relative {
      position: relative;
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
      transition: all 0.2s;
      
      &:hover, &.active {
        background-color: #f3f4f6;
        color: #111827;
      }
    }

    /* Dropdown Styles */
    .dropdown-menu {
      position: absolute;
      top: 120%;
      right: 0;
      width: 260px;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      z-index: 50;
      animation: fadeIn 0.15s ease-out;
      overflow: hidden;

      &:before {
        content: '';
        position: absolute;
        top: -5px;
        right: 12px;
        width: 10px;
        height: 10px;
        background: white;
        transform: rotate(45deg);
        border-left: 1px solid #e5e7eb;
        border-top: 1px solid #e5e7eb;
      }
    }

    .dropdown-content {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      color: #374151;
      font-size: 0.875rem;
      
      .author-text {
        strong {
          color: #111827;
          font-weight: 600;
        }
      }

      .github-link {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #111827;
        padding: 0.4rem;
        border-radius: 0.375rem;
        transition: background-color 0.2s;

        &:hover {
          background-color: #f3f4f6;
        }
      }
    }

    .dropdown-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 40;
      cursor: default;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeaderComponent {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);
  
  readonly BellIcon = Bell;
  readonly MenuIcon = Menu;
  readonly GithubIcon = Github;

  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }
}
