import { Component, OnInit, ViewChild  } from '@angular/core';
import { UsersService } from 'src/app/services/admin/users.service';
import { PersonsService } from 'src/app/services/admin/persons.service';
import { UserResponseDto } from '../../../DTOs/Users/UserResponseDto';
import { UserRequestDto } from '../../../DTOs/Users/UserRequestDto';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';
import { PersonResponseDto } from 'src/app/DTOs/Persons/PersonResponseDto';

declare var $:any;
declare var bootstrap: any;

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('addUsersForm') addUserForm!: NgForm;
  user: UserRequestDto = new UserRequestDto();
  users: UserResponseDto[] = [];
  persons: PersonResponseDto[] = [];
  selectedPersonId: number = 0;
  selectedTotalItems: number = 10;
  totalPages: any[] = [];
  currentPage: number = 1;

  constructor(private personService: PersonsService, private userService: UsersService) {}

  ngOnInit(): void {
    //this.getAll();
    this.getAllPagedUsers(1, 10);
    this.getAllPersons();
  }

  getAll() {
    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
    });
  }

  getAllPagedUsers(pageNumber: number, pageSize: number) {
    try {
      this.userService.getAllPaged(pageNumber, pageSize).subscribe({
        next:(response) => {
          this.currentPage = pageNumber;
          this.totalPages = Array.from({ length: response.data.totalPages}, (_, i) => i + 1);
          this.users = response.data.items.flat();
        },
        error:(err) => {

        }
      });
    }
    catch(err) {

    }
  }

  addNew(): void {
    this.clearModel();
  }

  clearModel(){
    this.addUserForm.resetForm();
    this.user.id = 0;
    this.selectedPersonId = 0;
    this.user.personId = 0;
    this.user.domainName = "";
    this.user.email = "";
    this.user.password = "";
  }

  add(){
    if(this.user.id == 0) {
      if(this.selectedPersonId == 0 || this.selectedPersonId == undefined){
        Swal.fire({
          title: "Please select a person for this user.",
          icon: "warning"
        });
        return;
      }

      this.user.personId = this.selectedPersonId;
      this.userService.add(this.user).subscribe({
        next:()=>{
          Swal.fire({
            title: "User added successfully",
            icon: "success",
          });
          this.clearModel();
          this.getAll();
          $('#addModal').modal('hide');
        },
        error:(err)=>{
          console.log(err.error.message);
        }
      });
    }
    else {
      if(this.selectedPersonId == 0 || this.selectedPersonId == undefined){
          Swal.fire({
              title: "Please select a person for this user.",
              icon: "warning",
            });
        return;
      }

      this.user.personId = this.selectedPersonId;
      this.userService.update(this.user.id, this.user).subscribe({
        next:(response) => {
          Swal.fire({
            title: "User updated.",
            icon: "success",
          });
          this.clearModel();
          this.getAll();
          $('#addModal').modal('hide');
        },
        error:(err) => {
          Swal.fire({
            title: "An error has occurs",
            text: err.error?.message || "Unexpected error",
            icon: "error"
          });
        }
      });
    }

  }

  editGetUserInfo(userId: number): void {
    try {
      let currentUser = this.users.find(u => u.id == userId);
      if(currentUser != undefined && currentUser) {
        this.user = Object.assign(new UserRequestDto(), currentUser);
        this.user.personId = currentUser.person.id;
        this.selectedPersonId = currentUser.person.id;
        $('#addModal').modal('show');
      }
      else {
        Swal.fire({
          title: "Sometign when wrong.",
          icon: "error"
        });
      }
    }
    catch(err) {

    }
  }

  disable(userId: number): void{
    try {
      if(userId > 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "This user is goning to be disabled!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.delete(userId).subscribe({
              next:(response) => {
                Swal.fire({
                  title: "User disabled.",
                  icon: "success",
                });
                this.getAll();
              },
              error:(err)=>{
                alert(err.error.message);
              }
            });
          }
        });
      }
      else {
        Swal.fire({
            title: "User Id is required.",
            icon: "warning",
          });
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  getAllPersons(){
     this.personService.getAll().subscribe({
      next: (response) => { 
        this.persons = response.data;
      },
      error: err => {
        Swal.fire({
          title: "An error has occurs",
          text: err.error?.message || "Unexpected error",
          icon: "error"
        });
      }
     });
  }

  
  onTotalItemsChange(event: any): void {
    try {
      let totalItems = event.target.value;
      let pageNumber = 1;
      this.getAllPagedUsers(pageNumber, totalItems);
    }
    catch(err) {

    }
  }

  onPageChange(pageNumber: number): void {
    try {
      this.currentPage = pageNumber;
      this.getAllPagedUsers(pageNumber, this.selectedTotalItems);
    }
    catch(err) {

    }
  }

  previosPage(): void {
    try{
      if(this.currentPage > 1) {
        this.currentPage -= 1;
        this.getAllPagedUsers(this.currentPage, this.selectedTotalItems);
      }
    }
    catch(err){

    }
  }

  nextPage(): void {
    try{
      if(this.currentPage < this.totalPages.length) {
        this.currentPage += 1;
        this.getAllPagedUsers(this.currentPage, this.selectedTotalItems);
      }
    }
    catch(err){

    }
  }

}
