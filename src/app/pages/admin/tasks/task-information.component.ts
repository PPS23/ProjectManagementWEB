import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/admin/comments.service';
import { ProjectsService } from 'src/app/services/admin/projects.service';
import { TasksService } from 'src/app/services/admin/tasks.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var $:any;

@Component({
  selector: 'app-task-information',
  templateUrl: './task-information.component.html',
  styleUrls: ['./task-information.component.css']
})
export class TaskInformationComponent implements OnInit {
  taskId: number = 0;
  taskModel: any = {
    id: 0,
    title: "",
    description: "",
    creationDate: Date(),
    updatedDate: Date(),
    isActive: true,
    project: {},
    status: {},
    comments: []
  };
  commentModel: any = {
    id: 0,
    taskId: 0,
    userId: 0,
    description: "",
    createdDate: new Date(),
    user: {
      id: 4,
      email: "",
      domainName: "",
      isActvie: true,
      person: {}
    }
  };

  currentUser: any = {
    id: 0,
    domainName: ""
  };
  public editorConfig:any = ClassicEditor;

  constructor(private route: ActivatedRoute, private taskService: TasksService, private commentsService: CommentsService, private router: Router){}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get("id"));
    const storageData = localStorage.getItem("currentUser");
    if(storageData) {
      this.currentUser = JSON.parse(storageData);
    }
    else {
      this.router.navigate(["/login"]);
    }

    this.loadTask(this.taskId);
    
  }

  loadTask(taskId: number): void {
    try {
      this.taskService.getById(taskId, true).subscribe({
        next:(response) => {
          this.taskModel = response;
        },
        error:(err) => {
          console.log(err.error.message);
        }
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  cleanComentaryModel(): void {
    try {
      this.commentModel = {
        id: 0,
        taskId: 0,
        userId: 0,
        description: "",
        createdDate: new Date()
      };
    }
    catch(err) {
      console.log(err);
    }
  }

  onAddClick(): void {
    try {
      this.cleanComentaryModel();
    }
    catch(err) {
      console.log(err);
    }
  }

  addComment(): void {
    try {
      if(this.commentModel.description != "") {
        this.commentModel.taskId = this.taskId;
        this.commentModel.userId = this.currentUser.id;
        this.commentsService.add(this.commentModel).subscribe({
          next: (response) => {
            if(response.success) {
              this.loadTask(this.taskId);
              this.cleanComentaryModel();
              $('#addModal').modal('hide');
            }
          },
          error: (err) => {
            alert(err.error.message);
          }
        });
      }
    }
    catch(err) {

    }
  }

}
