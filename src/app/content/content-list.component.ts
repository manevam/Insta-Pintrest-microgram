import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { ActivatedRoute } from "@angular/router";
import { IContent } from "./content.interface";

@Component({
  selector: 'content-list',
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.css"]
})
export class ContentListComponent implements OnInit{
  posts: IContent | any;

  constructor(private postService: PostService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
