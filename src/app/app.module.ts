import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './pages/admin/user/users.component';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/dashboard/index/index.component';
import { SideBarComponent } from './pages/dashboard/side-bar/side-bar.component';
import { HeaderComponent } from './pages/dashboard/header/header.component';
import { FooterComponent } from './pages/dashboard/footer/footer.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ErrorComponent } from './pages/dashboard/error/error.component';
import { PersonsComponent } from './pages/admin/persons/persons.component';
import { ProjectsComponent } from './pages/admin/projects/projects.component';
import { CommentsComponent } from './pages/admin/comments/comments.component';
import { TasksComponent } from './pages/admin/tasks/tasks.component';
import { StatusComponent } from './pages/admin/status/status.component';
import { ApiUrlInterceptor } from './services/api-url.interceptor';
import { TaskInformationComponent } from './pages/admin/tasks/task-information.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    IndexComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    ErrorComponent,
    PersonsComponent,
    ProjectsComponent,
    CommentsComponent,
    TasksComponent,
    StatusComponent,
    TaskInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiUrlInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
