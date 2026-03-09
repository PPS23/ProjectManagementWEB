import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonRequestDto } from 'src/app/DTOs/Persons/PersonRequestDto';
import { PersonsService } from 'src/app/services/admin/persons.service';
import Swal from 'sweetalert2'
declare var $:any;

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  @ViewChild('addForm') addForm!: NgForm;
  person: PersonRequestDto = new PersonRequestDto();
  persons: PersonRequestDto[] = [];
  selectedTotalItems: number = 10;
  totalPages: any[] = [];
  currentPage: number = 1;

  constructor(private personService: PersonsService){}

  ngOnInit(): void {
    this.getAllPaged(1, 10);
  }

  add(): void {

    try {
      if(this.person.id == 0) {
        this.personService.add(this.person).subscribe({
          next:(response)=> {
            if(response.success) {
              Swal.fire({
                title: "Person was added successfully",
                icon: "success"
              });

              this.clearForm();
              this.getAllPaged(1, 10);
              $('#addModal').modal('hide');
            }
            else {
              Swal.fire({
                title: response.message,
                icon: "error"
              });
            }
          },
          error: err => {
            Swal.fire({
              title: err.error.message,
              icon: "error"
            });
          }
        });
      }
      else if(this.person.id > 0) {
        this.personService.update(this.person.id, this.person).subscribe({
          next: (response) => {
            if(response.success) {
              Swal.fire({
                title: "Person was updated successfully",
                icon: "success"
              });

              this.clearForm();
              this.getAllPaged(1, 10);
              $('#addModal').modal('hide');
            }
            else {
              Swal.fire({
                title: response.message,
                icon: "error"
              });
            }
          },
          error: (err) => {
            Swal.fire({
              title: err.error.message,
              icon: "error"
            });
          }
        });
      }
    }
    catch(err) {

    }
  }

  editGetUserInfo(id: number): void {
    try {
      let currentPerson = this.persons.find(u => u.id == id);
      if(currentPerson != undefined && currentPerson) {
        this.person = Object.assign(new PersonRequestDto(), currentPerson);
        $('#addModal').modal('show');
      }
      else {
        this.clearForm();
        Swal.fire({
          title: "Sometign when wrong.",
          icon: "error"
        });
      }
    }
    catch(err) {

    }
  }

  disable(id: number): void {
    try {
    try {
      if(id > 0) {
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
            this.personService.delete(id).subscribe({
              next:(response) => {
                if(response.success) {
                  Swal.fire({
                    title: "Person disabled.",
                    icon: "success",
                  });
                  this.getAllPaged(1, 10);
                }
                else {
                  Swal.fire({
                    title: response.message,
                    icon: "error",
                  });
                }

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
    catch(err) {
      
    }
  }

  loadAll(): void{
    this.personService.getAll().subscribe({
      next:(response)=>{
        this.persons = response.data;
      },
      error: err => {
        Swal.fire({
          title: err.error.message,
          icon: "error"
        });
      }
    });
  }

  clearForm(): void {
    try {
      this.addForm.resetForm();
      this.person.id = 0;
    }
    catch(err) {

    }
  }

  getAllPaged(pageNumber: number, pageSize: number) {
    try {
      this.personService.getAllPaged(pageNumber, pageSize).subscribe({
        next:(response) => {
          this.currentPage = pageNumber;
          this.totalPages = Array.from({ length: response.data.totalPages}, (_, i) => i + 1);
          this.persons = response.data.items.flat();
        },
        error:(err) => {

        }
      });
    }
    catch(err) {

    }
  }

  onTotalItemsChange(event: any): void {
    try {
      let totalItems = event.target.value;
      let pageNumber = 1;
      this.getAllPaged(pageNumber, totalItems);
    }
    catch(err) {

    }
  }

  onPageChange(pageNumber: number): void {
    try {
      this.currentPage = pageNumber;
      this.getAllPaged(pageNumber, this.selectedTotalItems);
    }
    catch(err) {

    }
  }

  previosPage(): void {
    try{
      if(this.currentPage > 1) {
        this.currentPage -= 1;
        this.getAllPaged(this.currentPage, this.selectedTotalItems);
      }
    }
    catch(err){

    }
  }

  nextPage(): void {
    try{
      if(this.currentPage < this.totalPages.length) {
        this.currentPage += 1;
        this.getAllPaged(this.currentPage, this.selectedTotalItems);
      }
    }
    catch(err){

    }
  }

}
