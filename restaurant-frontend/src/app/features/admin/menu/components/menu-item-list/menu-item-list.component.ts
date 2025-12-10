import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../../../../core/services/menu.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { InventoryService } from '../../../../../core/services/inventory.service';
import { MenuItem, Category, Recipe } from '../../../../../core/models/menu.models';
import { InventoryItem } from '../../../../../core/models/inventory.models';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { LucideAngularModule, Plus, Edit, Trash2 } from 'lucide-angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-item-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './menu-item-list.component.html',
  styleUrl: './menu-item-list.component.scss'
})
export class MenuItemListComponent implements OnInit {
  private menuService = inject(MenuService);
  private categoryService = inject(CategoryService);
  private inventoryService = inject(InventoryService);
  private fb = inject(FormBuilder);

  items = signal<MenuItem[]>([]);
  categories = signal<Category[]>([]);
  inventoryItems = signal<InventoryItem[]>([]);
  isLoading = signal(true);

  isModalOpen = signal(false);
  editingItem = signal<MenuItem | null>(null);

  form: FormGroup;

  readonly PlusIcon = Plus;
  readonly EditIcon = Edit;
  readonly TrashIcon = Trash2;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category_id: [null, Validators.required],
      available: [true],
      recipes: this.fb.array([])
    });
  }

  get recipes() {
    return this.form.get('recipes') as FormArray;
  }

  ngOnInit() {
    this.loadData();
    this.loadInventory();
  }

  loadData() {
    this.isLoading.set(true);
    this.categoryService.getAll().subscribe(cats => {
      this.categories.set(cats);
      
      this.menuService.getAll().subscribe(items => {
        this.items.set(items);
        this.isLoading.set(false);
      });
    });
  }

  loadInventory() {
    this.inventoryService.getAll().subscribe(data => this.inventoryItems.set(data));
  }

  getCategoryName(id: number): string {
    const cat = this.categories().find(c => c.category_id === id);
    return cat ? cat.name : 'Unknown';
  }

  addRecipe() {
    const recipeForm = this.fb.group({
      inventory_id: [null, Validators.required],
      quantity_needed: [1, [Validators.required, Validators.min(0.01)]]
    });
    this.recipes.push(recipeForm);
  }

  removeRecipe(index: number) {
    this.recipes.removeAt(index);
  }

  openCreate() {
    this.editingItem.set(null);
    this.form.reset({ price: 0, available: true });
    this.recipes.clear();
    this.isModalOpen.set(true);
  }

  openEdit(item: MenuItem) {
    this.editingItem.set(item);
    this.recipes.clear();
    
    // Populate simple fields
    this.form.patchValue({
      name: item.name,
      description: item.description,
      price: item.price,
      category_id: item.category_id,
      available: item.available
    });
    
    // Populate recipes
    if (item.recipes && item.recipes.length > 0) {
      item.recipes.forEach(r => {
        this.recipes.push(this.fb.group({
          inventory_id: [r.inventory_id, Validators.required],
          quantity_needed: [r.quantity_needed, [Validators.required, Validators.min(0.01)]]
        }));
      });
    }

    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  save() {
    if (this.form.invalid) return;
    
    const data = this.form.value;
    data.price = Number(data.price);
    data.category_id = Number(data.category_id);

    if (this.editingItem()) {
      this.menuService.update(this.editingItem()!.item_id, data).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    } else {
      this.menuService.create(data).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    }
  }

  deleteItem(id: number) {
    if (!confirm('Delete this menu item?')) return;
    this.menuService.delete(id).subscribe(() => this.loadData());
  }

  getUnit(inventoryId: number): string {
      const item = this.inventoryItems().find(i => i.inventory_id == inventoryId);
      return item ? item.unit : '';
  }
}
