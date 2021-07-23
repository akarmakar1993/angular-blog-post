import { Component, OnInit } from '@angular/core';
import { BlogService } from "./services/blog.service";
//import { Blog } from "../models/blog.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Iblog } from "./interfaces/Iblog";

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {

  blogs: Iblog[];
  //filteredEmployees: Blog[];
  error: string;


  constructor(
    private _blogService: BlogService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
  }


  ngOnInit() {
    this._blogService.getBlogs().subscribe(
      /* next: blogs => {
        this.blogs = blogs;
        console.log(this.blogs) */
        (listBlogs) => this.blogs = listBlogs,
        (err) => console.log(err)
    )
  }

}
