import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { PostService } from "../services/post.service";
import { map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ContentListResolver implements Resolve<any>{

  constructor(private postService: PostService) { }

  resolve() {
    return this.postService.getPosts().pipe(map(posts => posts))
  }
}
