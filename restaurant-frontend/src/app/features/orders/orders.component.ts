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
      <div class="page-header">
        <h1>Active Orders</h1>
        <p>Real-time kitchen display system (KDS)</p>
      </div>

      <div class="actions-bar">
        <button class="btn-primary" (click)="isModalOpen.set(true)">
          <lucide-icon [img]="PlusIcon" size="18"></lucide-icon>
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
      padding: 2rem; 
    }

    .page-header {
      margin-bottom: 2rem;
      h1 { font-size: 1.875rem; font-weight: 700; color: #111827; margin: 0; }
      p { color: #6b7280; margin-top: 0.5rem; }
    }

    .actions-bar {
      display: flex;
      justify-content: flex-end; /* Aligns to right like Reservations/Tables */
      margin-bottom: 2rem;
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 0.5rem 1rem; /* Reduced padding */
      border-radius: 0.375rem; /* Standard radius */
      font-weight: 500; /* Reduced weight */
      cursor: pointer;
      font-size: 0.95rem; /* Slightly smaller */
      transition: background-color 0.2s;
      
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
