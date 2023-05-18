import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { PostService } from "../services/post.service";
import { ActivatedRoute } from "@angular/router";
import { IContent } from "./content.interface";

@Component({
  selector: 'content-list',
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.css"]
})
export class ContentListComponent implements OnInit{
  posts: IContent []= [];

  constructor(private postService: PostService, private route: ActivatedRoute,
  private changeDetection: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  loadNextPosts() {

    this.postService.currentPage++;
    console.log(this.postService.currentPage);

    this.getPosts();
    if (this.posts.length <= 0) {
      alert("No more posts");
    } else {
      this.changeDetection.detectChanges();
    }
  }

  loadPreviousPosts() {
    if (this.postService.currentPage === 1) {
      alert("This is the first page");
    } else {
    this.postService.currentPage--;
    this.getPosts();
    this.changeDetection.detectChanges();
    }

  }
}
