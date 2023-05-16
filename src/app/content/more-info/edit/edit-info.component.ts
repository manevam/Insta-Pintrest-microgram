import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/services/post.service";
import { IContent } from "../../content.interface";

@Component({
  templateUrl: './edit-info.component.html',
  styleUrls:['./edit-info.component.css']
})
export class EditInfoComponent{
  post: any
  newTitle!: string;
  selectedFile: File | null = null;
  title!: string;


  constructor(private postService: PostService,
    private route: ActivatedRoute,
  private router:Router) { }

  ngOnInit() {
    this.postService.getPost(+this.route.snapshot.params['id'])
    .subscribe(post => {
      this.post = post;
      this.newTitle = post.title;
    });

  }

  editPost(formValues: any) {
    console.log(formValues);

    const updatedPost: IContent = {
      ...this.post,
      title: formValues.newTitle || this.post.title
    };

    if (this.selectedFile) {

      const formData = new FormData();
      formData.append('picture', this.selectedFile, this.selectedFile.name);

      this.postService.uploadPicture(this.post.id, formData).subscribe((url: string) => {
        updatedPost.url = url;
        updatedPost.thumbnailUrl = url;
      this.postService.updatePost(this.post.id, updatedPost).subscribe(() => {
        this.router.navigate(['/posts', this.post.id]);
        });
      });

    } else {
      this.postService.updatePost(this.post.id, updatedPost).subscribe(() => {
      this.router.navigate(['/posts', this.post.id]);
      });
    }
    this.title = updatedPost.title;
  }

  onPictureSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getTitle() {
    return this.post.title;
  }
}
