import { Component, inject, signal, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../../../../core/services/table.service';
import { MenuService } from '../../../../core/services/menu.service';
import { CategoryService } from '../../../../core/services/category.service';
import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Table } from '../../../../core/models/table.models';
import { MenuItem, Category } from '../../../../core/models/menu.models';
import { LucideAngularModule, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-angular';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  // Services
  private tableService = inject(TableService);
  private menuService = inject(MenuService);
  private categoryService = inject(CategoryService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  @Output() orderCreated = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  // Data Signals
  tables = signal<Table[]>([]);
  categories = signal<Category[]>([]);
  menuItems = signal<MenuItem[]>([]);
  
  // UI State
  activeCategory = signal<number | 'all'>('all');
  searchQuery = signal('');
  
  // Cart State
  selectedTableId = signal<number | null>(null);
  cart = signal<CartItem[]>([]);

  // Computed
  total = signal(0);

  // Icons
  readonly PlusIcon = Plus;
  readonly MinusIcon = Minus;
  readonly TrashIcon = Trash2;
  readonly CartIcon = ShoppingCart;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.tableService.getAll().subscribe(data => this.tables.set(data));
    this.categoryService.getAll().subscribe(data => this.categories.set(data));
    this.menuService.getAll().subscribe(data => {
      // Filter only available items
      this.menuItems.set(data.filter(i => i.available));
    });
  }

  get filteredItems() {
    let items = this.menuItems();
    
    // Category Filter
    if (this.activeCategory() !== 'all') {
      items = items.filter(i => i.category_id === this.activeCategory());
    }

    // Search Filter (optional simple implementation)
    // if (this.searchQuery()) ...

    return items;
  }

  selectTable(id: number) {
    this.selectedTableId.set(id);
  }

  addToCart(item: MenuItem) {
    this.cart.update(currentCart => {
      const existing = currentCart.find(i => i.menuItem.item_id === item.item_id);
      if (existing) {
        existing.quantity++;
        return [...currentCart];
      } else {
        return [...currentCart, { menuItem: item, quantity: 1 }];
      }
    });
    this.calculateTotal();
  }

  removeFromCart(itemId: number) {
    this.cart.update(cart => cart.filter(i => i.menuItem.item_id !== itemId));
    this.calculateTotal();
  }

  updateQuantity(itemId: number, delta: number) {
    this.cart.update(cart => {
      const item = cart.find(i => i.menuItem.item_id === itemId);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          return cart.filter(i => i.menuItem.item_id !== itemId);
        }
      }
      return [...cart];
    });
    this.calculateTotal();
  }

  calculateTotal() {
    const sum = this.cart().reduce((acc, item) => acc + (Number(item.menuItem.price) * item.quantity), 0);
    this.total.set(sum);
  }

  submitOrder() {
    if (!this.selectedTableId() || this.cart().length === 0) return;

    const currentUser = this.authService.currentUser();
    if (!currentUser) return;

    const orderData = {
      table_id: Number(this.selectedTableId()),
      employee_id: currentUser.employee_id,
      order_time: new Date().toISOString(),
      status: 'pending' as const, // Explicit type cast to match literal type
      orderItems: this.cart().map(i => ({
        item_id: i.menuItem.item_id,
        quantity: i.quantity
      }))
    };

    this.orderService.create(orderData).subscribe({
      next: () => {
        this.orderCreated.emit();
      },
      error: (err) => {
        console.error('Order creation failed', err);
        alert('Failed to create order. Check inventory.');
      }
    });
  }
}
