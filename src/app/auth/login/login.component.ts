import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  credentials = { email: '', password: '' };

  constructor(private router: Router, private commonService: CommonService, private toastr: ToastrService) { }

  onSubmit() {
    this.commonService.login(this.credentials).subscribe(
      response => {
        console.log(response)
        this.toastr.success('Login successfully');
        this.router.navigate(['/crud/list']);
      },
      error => {
        // Handle login error
        this.toastr.error('Login error');
      }
    );
  }
}
