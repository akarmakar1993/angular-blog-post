import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog.model';
import { BlogService } from "./services/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Iblog } from './interfaces/Iblog';


@Component({
  selector: 'app-show-blog-detail',
  templateUrl: './show-blog-detail.component.html',
  styleUrls: ['./show-blog-detail.component.css']
})
export class ShowBlogDetailComponent implements OnInit {

  blog: Iblog;
  private _id: number;
  constructor(private _blogService: BlogService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
    });

   /* this._blogService.findBlogById(this._id).subscribe((data)=>{
     this.blog = data;
   }); */
   this._blogService.findBlogById(this._id).subscribe(
     (blogById) => this.blog = blogById
   )
  }


}
