import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory.service';
import { InventoryItem } from '../../../core/models/inventory.models';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { LucideAngularModule, Plus, Pencil, Trash2, AlertTriangle, Package } from 'lucide-angular';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, ModalComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private fb = inject(FormBuilder);

  items = signal<InventoryItem[]>([]);
  showModal = signal(false);
  editingItem = signal<InventoryItem | null>(null);
  form: FormGroup;

  // Icons
  readonly PlusIcon = Plus;
  readonly EditIcon = Pencil;
  readonly DeleteIcon = Trash2;
  readonly AlertIcon = AlertTriangle;
  readonly PackageIcon = Package;

  constructor() {
    this.form = this.fb.group({
      item_name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['unit', Validators.required],
      min_quantity: [0, Validators.min(0)]
    });
  }

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.inventoryService.getAll().subscribe(data => this.items.set(data));
  }

  openCreate() {
    this.editingItem.set(null);
    this.form.reset({ quantity: 0, unit: 'unit', min_quantity: 5 });
    this.showModal.set(true);
  }

  openEdit(item: InventoryItem) {
    this.editingItem.set(item);
    this.form.patchValue(item);
    this.showModal.set(true);
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.editingItem()) {
      this.inventoryService.update(this.editingItem()!.inventory_id, data).subscribe(() => {
        this.loadInventory();
        this.showModal.set(false);
      });
    } else {
      this.inventoryService.create(data).subscribe(() => {
        this.loadInventory();
        this.showModal.set(false);
      });
    }
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this ingredient?')) {
      this.inventoryService.delete(id).subscribe(() => this.loadInventory());
    }
  }

  isLowStock(item: InventoryItem): boolean {
    return item.quantity <= (item.min_quantity || 0);
  }
}
