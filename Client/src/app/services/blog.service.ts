import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import{Http, Headers, RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http : Http
  ) { }

 
  createAuthenticationHeaders(){
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers : new Headers({
        'content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    })
  }

  newBlog(blog){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'blogs/newBlog', blog, this.options).pipe(map(res=> res.json()));
  }

  getAllBlogs(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'blogs/allBlogs', this.options).pipe(map(res=> res.json()));
  }

  getSingleBlog(id){
    this.createAuthenticationHeaders(); 
    return this.http.get(this.domain + 'blogs/singleblog/' + id, this.options).pipe(map(res=> res.json()));
  }
  

  editBlog(blog){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).pipe(map(res=> res.json()));
  }

  deleteBlog(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).pipe(map(res=> res.json()));
  }

  likeBlog(id){
    const blogData = {id: id}
    return this.http.put(this.domain + 'blogs/likeBlog/', blogData,  this.options).pipe(map(res=>res.json()));
  }

  dislikeBlog(id){
    const blogData = {id: id}
    return this.http.put(this.domain + 'blogs/dislikeBlog/', blogData,  this.options).pipe(map(res=>res.json()));
  }

  postComment(id, comment){
    this.createAuthenticationHeaders();
    const blogData = {
      id : id,
      comment: comment
    }
    return this.http.post(this.domain + 'blogs/comment', blogData, this.options).pipe(map(res=>res.json()));
  }

}
