import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUpdateComponent } from '../create-update/create-update.component';
import { DeleteComponent } from '../delete/delete.component';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  bsModalRef: BsModalRef | undefined;
  users!: any[];

  constructor(private modalService: BsModalService, private commonService: CommonService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserList();
  }

  // User List
  getUserList() {
    this.commonService.getUserListData().then((data) => {
      this.users = data;
    });
  }

  // Open add user modal
  openAddUserModal() {
    this.bsModalRef = this.modalService.show(CreateUpdateComponent);
    // Subscribe to the userCreated event emitted by CreateUpdateComponent
    this.bsModalRef.content.userCreated.subscribe((newUser: any) => {
      // Add the new user to the list
      this.addUser(newUser);
      this.bsModalRef?.hide();
    });

    // Subscribe to the cancelClicked event
    this.bsModalRef.content.cancelClicked.subscribe(() => {
      this.bsModalRef?.hide();
    });
  }

  // Open Edit user modal
  openEditUserModal(userData: any) {
    const initialState = {
      user: userData
    };
    this.bsModalRef = this.modalService.show(CreateUpdateComponent, { initialState });

    // Subscribe to the userUpdated event emitted by CreateUpdateComponent
    this.bsModalRef.content.userUpdated.subscribe((updatedUser: any) => {
      // Update the user data in the list
      this.editUser(updatedUser);
      this.bsModalRef?.hide();
    });

    // Subscribe to the cancelClicked event
    this.bsModalRef.content.cancelClicked.subscribe(() => {
      this.bsModalRef?.hide();
    });
  }

  // Open delete user modal
  openDeleteUserModal(user: any) {
    this.bsModalRef = this.modalService.show(DeleteComponent);
    this.bsModalRef.content.userDeleted.subscribe(() => {
      this.deleteUser(user);
      this.bsModalRef?.hide();
    });

    // Subscribe to the cancelClicked event
    this.bsModalRef.content.cancelClicked.subscribe(() => {
      this.bsModalRef?.hide();
    });
  }

  // Add a user
  async addUser(newUser: any) {
    try {
      await this.commonService.addUser(newUser);
      this.getUserList();
      this.toastr.success('User added successfully');
    } catch (error) {
      this.toastr.error('Error adding user');
    }
  }

  // Edit a user
  async editUser(updatedUser: any) {
    try {
      await this.commonService.editUser(updatedUser);
      const index = this.users.findIndex(u => u.email === updatedUser.email);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.toastr.success('User updated successfully');
      this.getUserList();
    } catch (error) {
      this.toastr.error('Error editing user');
    }
  }

  async deleteUser(user:any): Promise<void> {
    try {
      await this.commonService.deleteUser(user.id);
      this.toastr.success('User deleted successfully');
      this.getUserList();
    } catch (error) {
      this.toastr.error('Error deleting user');
    }
  }

}
