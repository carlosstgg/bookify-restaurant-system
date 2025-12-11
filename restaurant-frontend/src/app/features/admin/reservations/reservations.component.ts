import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService, Reservation } from '../../../core/services/reservation.service';
import { TableService } from '../../../core/services/table.service';
import { LucideAngularModule, Calendar, Clock, Users, Armchair, Edit, Trash2 } from 'lucide-angular'; // Updated icons
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-reservations-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule, ModalComponent],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsAdminComponent implements OnInit {
  // Icons
  CalendarIcon = Calendar;
  ClockIcon = Clock;
  UsersIcon = Users;
  ArmchairIcon = Armchair;
  EditIcon = Edit;
  TrashIcon = Trash2;

  private reservationService = inject(ReservationService);
  private fb = inject(FormBuilder);

  reservations: Reservation[] = [];
  availableTables: any[] = [];
  
  viewMode: 'list' | 'create' = 'list';
  isLoading = false;

  reservationForm: FormGroup;
  checkAvailabilityForm: FormGroup;
  editForm: FormGroup; // New form for editing

  selectedTable: any = null;
  
  // Modal State
  isEditing = false;
  editingReservation: Reservation | null = null;

  constructor() {
    this.reservationForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_phone: [''],
      people_count: [2, [Validators.required, Validators.min(1)]],
      reservation_time: ['', Validators.required], 
      duration: [120, Validators.required],
      table_id: [null, Validators.required]
    });

    this.checkAvailabilityForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: [120, Validators.required]
    });

    // Simplified edit form (not changing time/table for now to avoid complexity)
    this.editForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_phone: [''],
      people_count: [1, [Validators.required, Validators.min(1)]],
      status: ['confirmed', Validators.required]
    });
  }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.isLoading = true;
    this.reservationService.getAll().subscribe({
      next: (data) => {
        this.reservations = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  switchMode(mode: 'list' | 'create') {
    this.viewMode = mode;
    if (mode === 'create') {
      this.availableTables = [];
      this.selectedTable = null;
      this.reservationForm.reset({ people_count: 2, duration: 120 });
      this.checkAvailabilityForm.reset({ duration: 120 });
    }
  }

  checkAvailability() {
    if (this.checkAvailabilityForm.invalid) return;

    const { date, time, duration } = this.checkAvailabilityForm.value;
    const dateTimeStr = `${date}T${time}`;
    const dateTime = new Date(dateTimeStr);

    this.isLoading = true;
    this.reservationService.getAvailableTables(dateTime, duration).subscribe({
      next: (tables) => {
        this.availableTables = tables;
        this.isLoading = false;
        
        this.reservationForm.patchValue({
          reservation_time: dateTimeStr,
          duration: duration
        });
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  selectTable(table: any) {
    this.selectedTable = table;
    this.reservationForm.patchValue({ table_id: table.table_id });
  }

  createReservation() {
    if (this.reservationForm.invalid) return;

    const formVal = this.reservationForm.value;
    const dateObj = new Date(formVal.reservation_time);
    
    const payload: Reservation = {
      ...formVal,
      reservation_time: dateObj.toISOString(),
    };

    this.isLoading = true;
    this.reservationService.create(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.switchMode('list');
        this.loadReservations();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Error creating reservation');
      }
    });
  }

  // Edit Logic
  openEdit(reservation: Reservation) {
    this.editingReservation = reservation;
    this.isEditing = true;
    this.editForm.patchValue({
      customer_name: reservation.customer_name,
      customer_phone: reservation.customer_phone,
      people_count: reservation.people_count,
      status: reservation.status
    });
  }

  closeEdit() {
    this.isEditing = false;
    this.editingReservation = null;
    this.editForm.reset();
  }

  saveEdit() {
    if (this.editForm.invalid || !this.editingReservation) return;

    this.isLoading = true;
    const updates = this.editForm.value;

    this.reservationService.update(this.editingReservation.reservation_id!, updates).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeEdit();
        this.loadReservations();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Error updating reservation');
      }
    });
  }

  cancelReservation(id: number) {
    if(!confirm('Are you sure you want to cancel this reservation?')) return;
    
    this.reservationService.cancel(id).subscribe({
      next: () => this.loadReservations(),
      error: (err) => console.error(err)
    });
  }
}
