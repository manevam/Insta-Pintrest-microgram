import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router } from "@angular/router";
import { PostService } from "src/app/services/post.service";
import { IContent } from "../content.interface";
import { map } from "rxjs";

@Injectable()
export class PostActivator implements CanActivate {
  post: IContent | undefined;
  constructor(private postService: PostService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.postService.getPost(+route.params['id']).pipe(
      map(post => {
        if (post) {
          return true;
        } else {
          console.log("Pa si vleguva tamu kaj shto treba")
          return false;
        }
      })
    );
  }

}
