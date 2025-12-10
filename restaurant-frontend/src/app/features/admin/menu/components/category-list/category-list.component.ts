import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../../core/services/category.service';
import { Category } from '../../../../../core/models/menu.models';
import { LucideAngularModule, Plus, Trash2, Edit } from 'lucide-angular';
// We will reuse the Modal and create a small inline form or separate component for Category.
// For simplicity, let's do a simple prompt or small inline form for now, or a Modal.
// Let's use the same Modal pattern as Employees for consistency.
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  categories = signal<Category[]>([]);
  isLoading = signal(true);
  
  // Modal State
  isModalOpen = signal(false);
  editingCategory = signal<Category | null>(null);

  // Form
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  // Icons
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;
  readonly EditIcon = Edit;

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading.set(true);
    this.categoryService.getAll().subscribe(data => {
      this.categories.set(data);
      this.isLoading.set(false);
    });
  }

  openCreate() {
    this.editingCategory.set(null);
    this.form.reset();
    this.isModalOpen.set(true);
  }

  openEdit(cat: Category) {
    this.editingCategory.set(cat);
    this.form.patchValue({ name: cat.name });
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  save() {
    if (this.form.invalid) return;
    
    const name = this.form.value.name;

    if (this.editingCategory()) {
      this.categoryService.update(this.editingCategory()!.category_id, { name }).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    } else {
      this.categoryService.create({ name }).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  deleteCategory(id: number) {
    if (!confirm('Delete this category? Items in this category might be affected.')) return;
    
    this.categoryService.delete(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
