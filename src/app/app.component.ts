import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContent } from './content/content.interface';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Insta microgram';
  posts: IContent[] = [];

  constructor(private http: HttpClient, private postService:PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
    });
  }


}
