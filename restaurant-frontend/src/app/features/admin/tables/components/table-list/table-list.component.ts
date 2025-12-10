import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from '../../../../../core/services/table.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { Table } from '../../../../../core/models/table.models';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { LucideAngularModule, Plus, Edit, Trash2, Armchair } from 'lucide-angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent implements OnInit {
  private tableService = inject(TableService);
  private authService = inject(AuthService); // Inject Auth Service
  private fb = inject(FormBuilder);

  tables = signal<Table[]>([]);
  isLoading = signal(true);
  
  // Role Check
  isManager = computed(() => this.authService.currentUser()?.role === 'manager');

  isModalOpen = signal(false);
  editingTable = signal<Table | null>(null);

  form: FormGroup = this.fb.group({
    table_number: [null, [Validators.required, Validators.min(1)]],
    capacity: [4, [Validators.required, Validators.min(1), Validators.max(20)]]
  });

  readonly PlusIcon = Plus;
  readonly EditIcon = Edit;
  readonly TrashIcon = Trash2;
  readonly ArmchairIcon = Armchair;

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.isLoading.set(true);
    this.tableService.getAll().subscribe({
      next: (data) => {
        // Sort tables by number
        this.tables.set(data.sort((a, b) => a.table_number - b.table_number));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  openCreate() {
    this.editingTable.set(null);
    // Find next available table number logic could go here, for now just reset
    const nextNum = this.tables().length > 0 ? Math.max(...this.tables().map(t => t.table_number)) + 1 : 1;
    this.form.reset({ table_number: nextNum, capacity: 4 });
    this.isModalOpen.set(true);
  }

  openEdit(table: Table) {
    this.editingTable.set(table);
    this.form.patchValue({
      table_number: table.table_number,
      capacity: table.capacity
    });
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  save() {
    if (this.form.invalid) return;
    
    const data = this.form.value;
    
    if (this.editingTable()) {
      this.tableService.update(this.editingTable()!.table_id, data).subscribe(() => {
        this.loadTables();
        this.closeModal();
      });
    } else {
      this.tableService.create(data).subscribe({
        next: () => {
          this.loadTables();
          this.closeModal();
        },
        error: (err) => {
          alert('Failed to create table. Table number must be unique.');
        }
      });
    }
  }

  deleteTable(id: number) {
    if (!confirm('Are you sure you want to delete this table?')) return;
    this.tableService.delete(id).subscribe(() => this.loadTables());
  }
}
