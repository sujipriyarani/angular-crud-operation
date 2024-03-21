import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  @Output() userDeleted = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();
  modalRef?: BsModalRef;

  constructor() {}

  // Delete user
  deleteUser() {
    this.userDeleted.emit();
    this.modalRef?.hide();
  }

  // cancel view
  cancel() {
    this.cancelClicked.emit();
  }
}
