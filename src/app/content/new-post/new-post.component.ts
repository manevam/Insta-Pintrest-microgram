import { Component, HostListener } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { IContent } from "../content.interface";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent{
  isDirty: boolean = true
  title: string = '';
  picture: File | null = null;
  isTitleProvided: boolean = false;
  isTitleEmpty: boolean = true;
  isPictureProvided: boolean = false;
  showError: boolean = false;
  saved: boolean = false;


  constructor(private postService: PostService,private router:Router) { }

  newPost() {
    if (this.title && this.picture) {
      const formData = new FormData();
      formData.append('picture', this.picture, this.picture.name);

      const tempUrl = URL.createObjectURL(this.picture);
      const newPost: IContent = {
        albumId: 1,
        id: this.postService.posts.length + 1,
        title: this.title,
        url: tempUrl,
        thumbnailUrl: tempUrl
      };

      this.postService.addPost(newPost);
      this.router.navigate(['/posts']);
    }
  }

  onPictureSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.picture = files.item(0);
    this.isPictureProvided = files.length > 0;
  }

  isTitleValid() {
    if (this.title.trim().length > 0)
      return true;
    return false;
  }

  onSave() {
    this.saved = true;
  }

  canDeactivate(): boolean {
    if (this.isPictureProvided && this.isTitleProvided && !this.saved) {
      return confirm("Are you sure you want to leave this page without saving?");
    }
    return true;
  }

}
