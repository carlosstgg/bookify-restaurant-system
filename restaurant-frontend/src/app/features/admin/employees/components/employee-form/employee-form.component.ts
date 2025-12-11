import { Component, EventEmitter, Input, Output, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../../core/services/employee.service';
import { User, UserRole } from '../../../../../core/models/auth.models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);

  @Input() employee: User | null = null; // If passed, we are editing
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup = this.fb.group({
    full_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['waiter', [Validators.required]],
    phone: [''],
    password: ['']
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  roles: UserRole[] = ['waiter', 'chef', 'general_assistant', 'manager'];

  ngOnInit(): void {
    if (this.employee) {
      // Editing Mode
      this.form.patchValue({
        full_name: this.employee.full_name,
        email: this.employee.email,
        role: this.employee.role,
        phone: this.employee.phone
      });
      // Password is not required when editing unless changing it (logic handling below)
      this.form.get('password')?.removeValidators(Validators.required);
    } else {
      // Creation Mode
      this.form.get('password')?.addValidators([Validators.required, Validators.minLength(6)]);
    }
    this.form.get('password')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const formData = this.form.value;

    if (this.employee) {
      // Update
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password; // Don't send empty password

      this.employeeService.update(this.employee.employee_id, updateData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.saved.emit();
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage.set('Failed to update employee.');
          this.isLoading.set(false);
        }
      });
    } else {
      // Create
      this.employeeService.create(formData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.saved.emit();
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage.set('Failed to create employee. Email might be taken.');
          this.isLoading.set(false);
        }
      });
    }
  }
}
