import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { BlogType } from "src/app/models/blog-type.model";
import { Iblog } from './interfaces/Iblog';
import { BlogService } from "./services/blog.service";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  blogForm: FormGroup;
  blogTypes: BlogType[];
  submitted: boolean = false;
  blogToAdd: Iblog;
  constructor(
    private _formBuilder: FormBuilder, 
    private _blogService: BlogService,
    private router: Router
  ) { }

    validationMessages= {
      'name' : {
        'required': 'Author name is required.',
        'minlength': 'Author name must be greater than 3 characters',
        'maxlength': 'Author name must be less than 20 characters'
      },
      'blogTitle': {
        'required': 'Blog name is required.',
        'minlength': 'Blog name must be greater than 3 characters',
        'maxlength': 'Blog name must be less than 15 characters'
      },
      'blogType': {
        'required': 'Blog type is required.'
      },
      'blogDesc': {
        'required': 'Blog description is required.'
      }
    }

    blogFormErrors = {
      'name': '',
      'blogTitle': '',
      'blogType': '',
      'blogDesc': ''
    }


  ngOnInit() {
    this._blogService.getBlogType().subscribe({
      next: blogTypes => {
        this.blogTypes = blogTypes;
      }
    });

    this.blogForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      blogTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      blogType: ['', [Validators.required]],
      blogImage: this._formBuilder.array([
        this.addImageFormGroup()
      ]),
      date: [new Date()],
      blogDesc: ['', [Validators.required,]]
    });

    this.blogForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.blogForm);
    });

    this.blogToAdd = {
      id: null,
      name: '',
      blogTitle: '',
      blogType: '',
      blogDesc: '',
      date: null
    }
  }

  onSubmitBlog(): void {
    this.submitted = true;
    if (this.blogForm.valid) {
      this.mapFormValuesToBlogModel();
      this._blogService.createBlog(this.blogToAdd).subscribe(
        ()=> this.router.navigate(['blog']),
        (err: any)=> console.log(err)
      )
    }else{
      this.logValidationErrors(this.blogForm);
    }
  }


  mapFormValuesToBlogModel(){
    this.blogToAdd.name = this.blogForm.value.name;
    this.blogToAdd.blogTitle = this.blogForm.value.blogTitle;
    this.blogToAdd.blogType = this.blogForm.value.blogType;
    this.blogToAdd.blogDesc = this.blogForm.value.name;
    this.blogToAdd.date = new Date();
  }


  addImageField(): void{
    (<FormArray>this.blogForm.get('blogImage')).push(this.addImageFormGroup())
  }

  addImageFormGroup(): FormGroup {
    return this._formBuilder.group({
      blogImg: ['']
    });
  }

  deleteBlogImageArray(indexNumber: number): void {
    (<FormArray>this.blogForm.get('blogImage')).removeAt(indexNumber);
  }

  onImageChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.patchValue({
        fileSource: file.name
      });
    }

    /* const file = (event.target as HTMLInputElement).files[0];
    this.blogForm.patchValue({
      avatar: file
    }); */
    //this.blogForm.get('avatar').updateValueAndValidity()
  }

  logValidationErrors(group: FormGroup = this.blogForm): void{
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }else{
        this.blogFormErrors[key] = '';
        if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
          const messages = this.validationMessages[key];
          for(const errorKey in abstractControl.errors){
            this.blogFormErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
    })
  }

  onLoadFormBtnClick(): void {
    this.logValidationErrors(this.blogForm);
    console.log(this.blogFormErrors)
  }
}
