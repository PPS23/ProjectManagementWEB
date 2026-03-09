import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/admin/projects.service';
declare var $:any;
declare var bootstrap: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectList: any[] = [];
  projectModel: any = {
    id: 0,
    name: "",
    creationDate: Date(),
    isActive: true
  };

  constructor(private projectsService: ProjectsService) {

  }

  ngOnInit(): void {
    try {
      this.getAll();
    }
    catch(err) {
      console.log(err);
    }
  }

  cleanModel(): void {
    this.projectModel.id = 0;
    this.projectModel.name = "";
    this.projectModel.creationDate = Date();
    this.projectModel.isActive = true;
  }

  getAll(): void {
    try {
      this.projectsService.getAll().subscribe({
        next:(response) => {
          this.projectList = response.data;
        },
        error:(err) => {
          alert(err.error.message);
        }
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  add(): void {
    try {
      if(this.projectModel.name == "" || this.projectModel.name == undefined) {
        alert("Name is required.");
        return;
      }

      if(this.projectModel.id == 0) {
        this.projectsService.add(this.projectModel).subscribe({
          next: (response) => {
            if(response.success) {
              alert("Project added successfully.");
              this.cleanModel();
              this.getAll();
              $('#addModal').modal('hide');
            }
            else {
              alert("Something when wrong.");
            }
          },
          error: (err) => {

          }
        });
      }
      else if(this.projectModel.id > 0) {
        this.projectsService.update(this.projectModel.id, this.projectModel).subscribe({
          next: (response) => {
            if(response.success) {
              alert("Project updated successfully.");
              this.cleanModel();
              this.getAll();
              $('#addModal').modal('hide');
            }
            else {
              alert("Something when wrong.");
            }
          },
          error: (err) => {
            alert(err.error.message);
          }
        });
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  disable(id: number): void {
    try {
      this.projectsService.delete(id).subscribe({
        next:(resonse) => {
          alert("Project disabled.");
          this.getAll();
        },
        error:(err) => {
          alert(err.error.message);
        }
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  editProject(id: number): void {
    try {
      this.projectsService.getById(id).subscribe({
        next: (response) => {
          if(response.success) {
            this.projectModel = response.data;
            $('#addModal').modal('show');
          }
          else {
            this.projectModel.id = 0;
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

}
