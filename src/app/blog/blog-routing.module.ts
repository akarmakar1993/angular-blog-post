import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ListBlogComponent } from './list-blog.component';
import { CreateBlogComponent } from './create-blog.component';
import { ShowBlogDetailComponent } from "./show-blog-detail.component";


const blogRoutes: Routes = [
  { path: 'blog', component: ListBlogComponent },
  { path: 'create-blog', component: CreateBlogComponent },
  { path: 'blog/read/:id', component: ShowBlogDetailComponent },
  { path: '', redirectTo: '/blog', pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(blogRoutes)
  ],
  declarations: []
})
export class BlogRoutingModule { }
