import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateBlogComponent } from './blog/create-blog.component';
import { BlogRoutingModule } from './blog/blog-routing.module';
import { ListBlogComponent } from './blog/list-blog.component';
import { DisplayBlogComponent } from './blog/display-blog.component';
import { BlogService } from "./blog/services/blog.service";
import { ShowBlogDetailComponent } from './blog/show-blog-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    CreateBlogComponent,
    ListBlogComponent,
    DisplayBlogComponent,
    ShowBlogDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BlogRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
