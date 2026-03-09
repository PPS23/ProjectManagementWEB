import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/admin/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormsModule, NgForm } from '@angular/forms';
import { LoginDto } from 'src/app/DTOs/Users/LoginDto';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  userModel: LoginDto = new LoginDto();


  constructor(private userService: UsersService, private router: Router){}

  ngOnInit(): void {
    try {
      localStorage.clear();
      this.loginForm.resetForm();
    }
    catch(err) {

    }
  }

  signin(): void {
    try {
      this.userService.login(this.userModel).subscribe({
        next: (response) => {
          if(response.success) {
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            localStorage.setItem("token", response.data.token);
            this.router.navigate(["/pm"]);
          }
          else {
            Swal.fire({
              title: response.message,
              icon: "warning",
            });
          }
        },
        error: (err) => {
            Swal.fire({
              title: err.error.message,
              icon: "warning",
            });
        }
      });
    }
    catch(err) {

    }
  }

  sendMail(): void {
    try {
      Swal.fire({
        title: "Instructions sent",
        text: "The instructions to recover your password was sent to the registed email.",
        icon: "success",
      });

      $('#recoverModal').modal('hide');
      this.loginForm.resetForm();
    }
    catch(err) {

    }
  }

}
