import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './components/table-list/table-list.component';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, TableListComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Tables Management</h1>
        <p>Configure restaurant layout and capacity</p>
      </div>
      <app-table-list></app-table-list>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 2rem;

      h1 {
        font-size: 1.875rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
        margin-top: 2rem;
      }

      p {
        color: #6b7280;
        margin-top: 0.5rem;
      }
    }
  `]
})
export class TablesComponent {}
