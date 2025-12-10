import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderListComponent, OrderFormComponent, ModalComponent, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header-row">
        <div class="page-header">
          <h1>Active Orders</h1>
          <p>Real-time kitchen display system (KDS)</p>
        </div>
        <button class="btn-primary" (click)="isModalOpen.set(true)">
          <lucide-icon [img]="PlusIcon" size="20"></lucide-icon>
          <span>New Order</span>
        </button>
      </div>

      <app-order-list #list></app-order-list>

      <!-- POS Modal -->
      <app-modal
        *ngIf="isModalOpen()"
        title="New Order (POS)"
        size="xl"
        (closed)="isModalOpen.set(false)"
      >
        <app-order-form 
          (orderCreated)="onOrderCreated(list)" 
          (cancelled)="isModalOpen.set(false)"
        ></app-order-form>
      </app-modal>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
    }

    .page-header {
      h1 { font-size: 1.875rem; font-weight: 700; color: #111827; margin: 0; }
      p { color: #6b7280; margin-top: 0.5rem; }
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      font-size: 1rem;
      
      &:hover { background-color: #1d4ed8; }
    }
  `]
})
export class OrdersComponent {
  isModalOpen = signal(false);
  readonly PlusIcon = Plus;

  onOrderCreated(listComponent: OrderListComponent) {
    this.isModalOpen.set(false);
    listComponent.loadOrders(); // Refresh the list
  }
}
