import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { User } from '../../../core/models/auth.models';
import { LucideAngularModule, Plus, Trash2, Edit } from 'lucide-angular';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ModalComponent, EmployeeFormComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  
  employees = signal<User[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  // Modal State
  isModalOpen = signal(false);
  editingEmployee = signal<User | null>(null);

  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;
  readonly EditIcon = Edit;

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading.set(true);
    this.employeeService.getAll().subscribe({
      next: (data: User[]) => {
        this.employees.set(data);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Failed to load employees', err);
        this.errorMessage.set('Could not load employees.');
        this.isLoading.set(false);
      }
    });
  }

  openCreateModal() {
    this.editingEmployee.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(employee: User) {
    this.editingEmployee.set(employee);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.editingEmployee.set(null);
  }

  onFormSaved() {
    this.closeModal();
    this.loadEmployees(); // Refresh list
  }

  deleteEmployee(id: number) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeService.delete(id).subscribe({
      next: () => {
        this.employees.update(list => list.filter(e => e.employee_id !== id));
      },
      error: (err: any) => {
        alert('Failed to delete employee');
        console.error(err);
      }
    });
  }
}
