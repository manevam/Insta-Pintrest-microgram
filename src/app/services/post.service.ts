import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject, of, throwError,BehaviorSubject } from "rxjs";
import { IContent } from "../content/content.interface";
import { catchError, filter, first, map, tap } from 'rxjs/operators';

@Injectable()
export class PostService implements OnInit {
  private POSTS: IContent[] = [];
  private postsSubject = new BehaviorSubject<IContent[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts().subscribe();

  }

  getPosts(): Observable<IContent[]> {
    if (this.POSTS.length > 0) {
      return this.postsSubject.asObservable();
    } else {
      return this.http.get<IContent[]>('https://jsonplaceholder.typicode.com/photos').pipe(
        tap((posts) => {
          this.POSTS = posts;
          this.postsSubject.next(posts);
        })
      );
    }
  }

  get posts() {
    return this.POSTS
  }

  getPost(id: number): Observable<IContent> {
    const post = this.POSTS.find((p) => p.id === id);
    if (post) {
      return of(post);
    } else {
      return this.http.get<IContent>(`https://jsonplaceholder.typicode.com/photos/${id}`).pipe(
        tap((p) => {
          this.POSTS.push(p);
        })
      );
    }
  }

  updatePost(id: number, updatedPost: IContent): Observable<IContent> {
    const index = this.POSTS.findIndex((p) => p.id === id);

    if (index >= 0) {

      this.POSTS[index] = { ...this.POSTS[index], ...updatedPost };
      return of(this.POSTS[index]);
    } else {

      return throwError(`Post with id ${id} not found.`);
    }
  }

  deletePost(id: number): Observable<any> {
  const index = this.POSTS.findIndex((p) => p.id === id);
  if (index >= 0) {
    this.POSTS.splice(index, 1);
    return of(this.POSTS);
  } else {
    console.log(`Post with id ${id} not found`);
    return throwError(`Post with id ${id} not found.`);
  }
  }

  uploadPicture(postId: number, formData: FormData): Observable<string> {
  return new Observable((observer) => {
      setTimeout(() => {

        const tempUrl = URL.createObjectURL(formData.get('picture') as Blob);
        const postIndex = this.posts.findIndex((post) => post.id === postId);

        this.posts[postIndex].url = tempUrl;
        this.posts[postIndex].thumbnailUrl = tempUrl;
        observer.next(tempUrl);
        observer.complete();
      }, 1000);
    });
  }

  addPost(post: IContent) {
    this.POSTS.push(post);
    console.log('se stavi')
  }

}

