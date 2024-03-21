import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

const routes = [
  { path: 'list', component: ListComponent }
];

@NgModule({
  declarations: [
    ListComponent,
    CreateUpdateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrudModule { }
