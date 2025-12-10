import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { InventoryComponent } from '../inventory/inventory.component';

type Tab = 'menu-items' | 'categories' | 'inventory';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, MenuItemListComponent, InventoryComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  activeTab = signal<Tab>('menu-items');

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}
