import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.models';
import { LucideAngularModule, Clock, CheckCircle2 } from 'lucide-angular';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss'
})
export class KitchenComponent implements OnInit, OnDestroy {
  private orderService = inject(OrderService);
  private intervalId: any;

  orders = signal<Order[]>([]);
  now = new Date();
  
  readonly ClockIcon = Clock;
  readonly CheckIcon = CheckCircle2;

  ngOnInit() {
    this.loadOrders();
    // Poll orders
    this.intervalId = setInterval(() => {
       this.loadOrders();
       this.now = new Date();
    }, 15000); 

    // Update clock every second
    setInterval(() => this.now = new Date(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  loadOrders() {
    this.orderService.getAll().subscribe(data => {
      // Logic: Only show 'pending' or 'in_progress' orders. Chef doesn't care about 'served' or 'paid'
      const active = data.filter(o => o.status === 'pending' || o.status === 'in_progress');
      
      // Sort oldest first (FIFO - First In First Out for Kitchen)
      active.sort((a, b) => new Date(a.order_time).getTime() - new Date(b.order_time).getTime());
      
      this.orders.set(active);
    });
  }

  markReady(id: number) {
    this.orderService.update(id, { status: 'served' }).subscribe(() => this.loadOrders());
  }

  startPreparing(id: number) {
    this.orderService.update(id, { status: 'in_progress' }).subscribe(() => this.loadOrders());
  }

  // Helper to get elapsed minutes
  getElapsedMinutes(time: string): number {
    const diff = new Date().getTime() - new Date(time).getTime();
    return Math.floor(diff / 60000);
  }
}
