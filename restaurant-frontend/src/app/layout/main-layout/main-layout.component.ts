import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="layout-container">
      <app-sidebar></app-sidebar>
      <div class="main-content-wrapper">
        <app-header></app-header>
        <main class="content-area">
            <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {}
