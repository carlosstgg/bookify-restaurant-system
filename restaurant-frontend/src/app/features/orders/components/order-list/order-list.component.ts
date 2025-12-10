import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order.models';
import { LucideAngularModule, Clock, CheckCircle2, XCircle, Utensils, DollarSign } from 'lucide-angular';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  isLoading = signal(true);

  // Icons
  readonly ClockIcon = Clock;
  readonly CheckIcon = CheckCircle2;
  readonly CancelIcon = XCircle;
  readonly UtensilsIcon = Utensils;
  readonly DollarIcon = DollarSign;

  ngOnInit() {
    this.loadOrders();
    // In real app, you might want to poll every 30s or use Websockets
    setInterval(() => this.loadOrders(), 30000); 
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        // Calculate totals if backend doesn't provide
        const processed = data.map(o => ({
          ...o,
          total: o.orderItems?.reduce((acc, item) => acc + Number(item.subtotal), 0) || 0
        }));
        
        // Sort by time descending (newest first)
        processed.sort((a, b) => new Date(b.order_time).getTime() - new Date(a.order_time).getTime());
        
        this.orders.set(processed);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  updateStatus(id: number, status: any) {
    this.orderService.update(id, { status }).subscribe(() => this.loadOrders());
  }
}
