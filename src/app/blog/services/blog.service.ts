import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
//import { Blog } from "src/app/models/blog.model";
import { BlogType } from "src/app/models/blog-type.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Iblog } from "../interfaces/Iblog";

@Injectable()

export class BlogService {
    HttpHeaders: any;

    constructor(private httpClient: HttpClient){}

    getBlogs(): Observable<Iblog[]> {
        return this.httpClient.get<Iblog[]>('http://localhost:3000/posts').pipe(catchError(this.handelError));
    }

    findBlogById(blogId: number): Observable<Iblog> {
      return this.httpClient.get<Iblog>('http://localhost:3000/posts/' + blogId).pipe(catchError(this.handelError));
    }

    getBlogType(): Observable<BlogType[]> {
      return this.httpClient.get('http://localhost:8001/api/blog/blog-type').pipe(
        map(res => res['postTypes']),
        catchError(this.handelError)
      )
    }

    createBlog(post: Iblog): Observable<Iblog> {
      //const form = new FormData();
      return this.httpClient.post<Iblog>('http://localhost:8001/api/blog/add-blog', post, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handelError));
    }

    private handelError(errorResponce: HttpErrorResponse){
        if(errorResponce.error instanceof ErrorEvent){
            console.error("Client side error ", errorResponce.error.message);
          }else{
            console.error("Server side error ", errorResponce);
          }
          return throwError("There is a problem with the service, please try again after sometime.")
    }
}