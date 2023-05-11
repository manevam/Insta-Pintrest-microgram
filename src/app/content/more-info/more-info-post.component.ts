import { Component } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: "./more-info-post.component.html",
  styleUrls: ["./more-info-post.component.css"]
})
export class MoreInfoComponent {
  post: any

  constructor(private postService: PostService,
    private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.postService.getPost(+this.route.snapshot.params['id'])
    .subscribe(post => {
      this.post = post;
    });
  }

  onDelete(id: number) {
  if(confirm("Are you sure you want to delete this post?")) {
    this.postService.deletePost(id).subscribe(
      () => {
        const index = this.postService.posts.findIndex(p => p.id === id);
        if (index > -1) {
          this.postService.posts.splice(index, 1);
          alert('Post was deleted successfully');
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.router.navigate(['/posts']);
  }
}

}
