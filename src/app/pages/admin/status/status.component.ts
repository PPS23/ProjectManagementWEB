import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/admin/status.service';
declare var $:any;
declare var bootstrap: any;

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  statusList: any[] = [];
  statusModel: any = {
    id: 0,
    description: ""
  };

  constructor(private statusService: StatusService){

  }

  ngOnInit(): void {
    this.getAllStatus();
  }

  getAllStatus(): void {
    try {
      this.statusService.getAll().subscribe({
        next:(response)=>{
          if(response.success){
            this.statusList = response.data;
          }
          else {
            this.statusList = [];
            alert("An error has occurs.");
          }
        },
        error:(errResponse) => {
          console.log(errResponse);
        }
      });
    }
    catch(err) {

    }
  }

  editStatus(id: number): void {
    try {
      this.statusService.getById(id).subscribe({
        next: (response) => {
          if(response.success) {
            this.statusModel = response.data;
            $('#addModal').modal('show');
          }
          else {
            this.statusModel.id = 0;
          }
        },
        error:(errResponse) => {
          alert(errResponse.error.message);
        }
      });

    }
    catch(err) {
      console.log(err);
    }
  }

  disable(id: number): void {
    try {
      this.statusService.delete(id).subscribe({
        next:(response) => {
          this.getAllStatus();
        },
        error:(errResponse) => {
          alert(errResponse.error.message);
        }
      });
    }
    catch(err) {
      
    }
  }

  clearModel(): void {
    this.statusModel.id = 0;
    this.statusModel.description = "";
    this.statusModel.isActive = true;
  }

  add(): void{
    try {

      if(this.statusModel.description == "") {
        alert("Description is required.");
        return;
      }

      if(this.statusModel.id > 0) {
        let statusDto = {
          Id: this.statusModel.id,
          Description: this.statusModel.description,
          IsActive: this.statusModel.isActive
        };
        this.statusService.update(this.statusModel.id, statusDto).subscribe({
          next:(response)=>{
          if(response.success) {
            alert("Status has been updated.");
            this.getAllStatus();
            this.clearModel();
              
            $('#addModal').modal('hide');
            }
          },
          error:(errResponse)=>{
            alert(errResponse.error.message);
            this.clearModel();
          }
        });
      }
      else if(this.statusModel.id <= 0) {
        this.statusService.add(this.statusModel).subscribe({
          next:(response)=>{
            if(response.success) {
              alert("Status has been added.");
              this.getAllStatus();
              this.clearModel();
              
              $('#addModal').modal('hide');
            }
          },
          error:(errResponse)=>{
            alert(errResponse.error.message);
            this.clearModel();
          }
        });
      }


    }
    catch(err) {
      this.clearModel();
    }
  }

}
