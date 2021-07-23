import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.css']
})
export class DisplayBlogComponent implements OnInit {
  @Input() blog: Blog;
  constructor( private _router: Router ) { }

  ngOnInit() {
  }

  redirectToShowBlog(){
    this._router.navigate(["/blog/read/", this.blog.id], {
      queryParams: {
        title: this.blog.blogTitle,
      },
    });
  }
}
