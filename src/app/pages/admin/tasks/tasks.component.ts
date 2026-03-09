import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/admin/projects.service';
import { TasksService } from 'src/app/services/admin/tasks.service';
import { FormsModule } from '@angular/forms';
//import { CKEditorModule, loadCKEditorCloud, CKEditorCloudResult } from '@ckeditor/ckeditor5-angular';
//import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2'
declare var $:any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskModel: any = {
    id: 0,
    projectId: 0,
    statusId: 0,
    title: "",
    description: "",
    responsableUsers: []
  };
  tasks: any[] = [];
  selectedProjectId: number = 0;
  projectsList: any[] = [];
  currentUser: any = {
    id: 0,
    domainName: ""
  };
  selectedTotalItems: number = 10;
  totalPages: any[] = [];
  currentPage: number = 1;

  public editorConfig:any = ClassicEditor;

  constructor(private tasksService: TasksService, private route: Router, private projectsService: ProjectsService){

  }

  ngOnInit(): void {

    this.loadAllTasks(1, this.selectedTotalItems);
    const storageData = localStorage.getItem("currentUser");
    if(storageData) {
      this.currentUser = JSON.parse(storageData);
    }
    else {
      this.route.navigate(["/login"]);
    }
  }

  loadAllTasks(pageNumber: number, pageSize: number): void {
    try{
      this.tasksService.getAllPaged(pageNumber, pageSize).subscribe({
        next:(dataResponse) => {
          this.currentPage = 1;
          this.totalPages = Array.from({ length: dataResponse.data.totalPages}, (_, i) => i + 1);
          this.tasks = dataResponse.data.items;
          this.loadProjects();
        },
        error:(errResponse) => {
          console.log(errResponse);
        }
      });
    }
    catch(err){

    }
  }

  loadProjects(): void {
    try {
      this.projectsService.getAll().subscribe({
        next: (response) => {
          if(response.success) {
            this.projectsList = response.data;
          }
          else {

          }
        },
        error: (err) => {

        }
      });
    }
    catch(err) {

    }
  }

  openInfo(taskId: number): void {
    try {
      this.route.navigate(["pm/tasks/information", taskId]);
    }
    catch(err) {}
  }

  clearModel(): void {
    try {
      this.taskModel = {
        id: 0,
        projectId: 0,
        statusId: 0,
        title: "",
        description: "",
        responsableUsers: []
      };
      this.selectedProjectId = 0;
    }
    catch(err) {
      console.log(err);
    }
  }

  add(): void {
    try {

      let responsableUser = {
        userId: this.currentUser.id,
        taskId: 0
      };

      this.taskModel.projectId = this.selectedProjectId;
      this.taskModel.responsableUsers.push(responsableUser);
      
      this.tasksService.add(this.taskModel).subscribe({
        next:(response) => {
          if(response.success) {
            alert("Task added.");
            this.clearModel();
            this.loadAllTasks(1, this.selectedTotalItems);
            $('#addModal').modal('hide');
          }
        },
        error:(err) => {
          alert(err.error.message);
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
      this.loadAllTasks(pageNumber, totalItems);
    }
    catch(err) {

    }
  }

  onPageChange(pageNumber: number): void {
    try {
      this.currentPage = pageNumber;
      this.loadAllTasks(pageNumber, this.selectedTotalItems);
    }
    catch(err) {

    }
  }

  previosPage(): void {
    try{
      if(this.currentPage > 1) {
        this.currentPage -= 1;
        this.loadAllTasks(this.currentPage, this.selectedTotalItems);
      }
    }
    catch(err){

    }
  }

  nextPage(): void {
    try{
      if(this.currentPage < this.totalPages.length) {
        this.currentPage += 1;
        this.loadAllTasks(this.currentPage, this.selectedTotalItems);
      }
    }
    catch(err){

    }
  }




}
