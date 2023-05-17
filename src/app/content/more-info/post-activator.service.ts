import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router } from "@angular/router";
import { PostService } from "src/app/services/post.service";
import { IContent } from "../content.interface";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostActivator implements CanActivate {
  post: IContent | undefined;
  constructor(private postService: PostService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.post = this.postService.posts.find((p) => p.id === +route.params['id']);

    if (!!this.post)
      return true;
    else {
      this.router.navigate(['/posts']);
      return false;
    }
  }



}
