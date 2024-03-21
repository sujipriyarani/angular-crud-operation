import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent implements OnInit, OnChanges {
  @Input() user!: any; // Input for user data
  @Output() userCreated = new EventEmitter<any>();
  @Output() userUpdated = new EventEmitter<any>(); // New event emitter for user update
  @Output() cancelClicked = new EventEmitter<void>();
  modalRef?: BsModalRef;
  userForm!: FormGroup;
  title:string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.initializeForm();
    }
  }

  // Initialize form
  initializeForm() {
    this.userForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required], // Initialize with empty string
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
    this.title = this.user ? 'Edit' : 'Add';
    
    // If user data is provided, update the form values
    if (this.user) {
      console.log('edit page', this.user)
      this.userForm.patchValue(this.user);
    }
  }

  // Save user
  saveUser() {
    if (this.userForm.valid) {
      if (this.user) {
        this.userUpdated.emit(this.userForm.value); // Emit userUpdated event for editing
        console.log('this.userForm.value', this.userForm)

      } else {
        this.userCreated.emit(this.userForm.value); // Emit userCreated event for adding
      }
      this.userForm.reset();
      this.modalRef?.hide();
    } else {
      this.markAllAsTouched();
    }
  }

  // Cancel view
  cancel() {
    this.cancelClicked.emit();
  }

  // Touch validation for form
  markAllAsTouched() {
    Object.keys(this.userForm.controls).forEach(controlName => {
      this.userForm.get(controlName)?.markAsTouched();
    });
  }
}
