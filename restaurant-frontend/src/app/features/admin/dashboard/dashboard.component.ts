import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { InventoryService } from '../../../core/services/inventory.service';
import { Order } from '../../../core/models/order.models';
import { InventoryItem } from '../../../core/models/inventory.models';
import { LucideAngularModule, DollarSign, ShoppingBag, AlertCircle, Utensils } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  private orderService = inject(OrderService);
  private inventoryService = inject(InventoryService);

  orders = signal<Order[]>([]);
  inventory = signal<InventoryItem[]>([]);

  // Icons
  readonly DollarIcon = DollarSign;
  readonly BagIcon = ShoppingBag;
  readonly AlertIcon = AlertCircle;
  readonly FoodIcon = Utensils;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.orderService.getAll().subscribe(data => this.orders.set(data));
    this.inventoryService.getAll().subscribe(data => this.inventory.set(data));
  }

  // KPIs
  get totalSales(): number {
    return this.orders()
      .filter(o => o.status === 'paid' || o.status === 'served')
      .reduce((acc, order) => {
        const orderTotal = order.orderItems?.reduce((sum, item) => sum + (Number(item.subtotal) || 0), 0) || 0;
        return acc + orderTotal;
      }, 0);
  }

  get activeOrdersCount(): number {
    return this.orders().filter(o => o.status === 'pending' || o.status === 'in_progress').length;
  }

  get lowStockItems(): InventoryItem[] {
    return this.inventory().filter(i => i.quantity <= (i.min_quantity || 0));
  }

  get recentOrders(): Order[] {
    return [...this.orders()]
      .sort((a, b) => new Date(b.order_time).getTime() - new Date(a.order_time).getTime())
      .slice(0, 5);
  }

  getOrderTotal(order: Order): number {
     return order.orderItems?.reduce((sum, item) => sum + (Number(item.subtotal) || 0), 0) || 0;
  }
}
