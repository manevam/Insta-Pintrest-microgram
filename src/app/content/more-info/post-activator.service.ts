import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router } from "@angular/router";
import { PostService } from "src/app/services/post.service";
import { IContent } from "../content.interface";
import { catchError, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostActivator implements CanActivate {
  post: IContent | undefined;
  constructor(private postService: PostService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
  return this.postService.getPosts().pipe(
    map(posts => {
      this.post = posts.find(p => p.id === +route.params['id']);
      if (!!this.post)
        return true;
      else {
        this.router.navigate(['/posts']);
        return false;
      }
    }),
  );
}
}
