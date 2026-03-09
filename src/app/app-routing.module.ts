import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsComponent } from './pages/admin/persons/persons.component';
import { UsersComponent } from './pages/admin/user/users.component';
import { TasksComponent } from './pages/admin/tasks/tasks.component';
import { CommentsComponent } from './pages/admin/comments/comments.component';
import { IndexComponent } from './pages/dashboard/index/index.component';
import { ProjectsComponent } from './pages/admin/projects/projects.component';
import { StatusComponent } from './pages/admin/status/status.component';
import { TaskInformationComponent } from './pages/admin/tasks/task-information.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { 
    path: "pm", 
    component: IndexComponent, 
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: "persons", component: PersonsComponent },
      { path: "users", component: UsersComponent },
      { path: "status", component: StatusComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "tasks", component: TasksComponent },
      { path: "tasks/information/:id", component: TaskInformationComponent }
    ]},
    { path: '', redirectTo: 'pm', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
