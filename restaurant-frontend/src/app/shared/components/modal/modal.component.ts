import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="modal-overlay" (click)="close()">
      <div class="modal-container" [ngClass]="size" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" (click)="close()">
            <lucide-icon [img]="XIcon" size="20"></lucide-icon>
          </button>
        </div>
        <div class="modal-content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-container {
      background: white;
      border-radius: 0.75rem;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      animation: slideUp 0.3s ease-out;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      &.sm { max-width: 400px; }
      &.md { max-width: 500px; }
      &.lg { max-width: 800px; }
      &.xl { max-width: 1100px; }
    }

    .modal-header {
      padding: 1.25rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
      }

      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #6b7280;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background 0.2s;

        &:hover {
          background-color: #f3f4f6;
          color: #111827;
        }
      }
    }

    .modal-content {
      padding: 1.25rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ModalComponent {
  @Input() title = 'Modal';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Output() closed = new EventEmitter<void>();
  
  readonly XIcon = X;

  close() {
    this.closed.emit();
  }
}
