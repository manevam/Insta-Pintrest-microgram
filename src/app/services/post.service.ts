import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of, throwError,BehaviorSubject } from "rxjs";
import { IContent } from "../content/content.interface";
import { catchError, filter, first, map, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class PostService {
  private POSTS: IContent[] = [];
  private postsSubject = new BehaviorSubject<IContent[]>([]);
  currentPage: number = 1;

  constructor(private http: HttpClient, private router: Router) {
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

  getPPosts(): Observable<IContent[]> {
    const startIndex = (this.currentPage - 1) * 10;

    return this.http
      .get<IContent[]>('https://jsonplaceholder.typicode.com/photos', {
        params: {
          _start: startIndex.toString(),
          _limit: '12',
        },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.router.navigate(['/404']);
          }
          return throwError(error);
        }),
        tap((posts) => {
          this.POSTS = posts;
          this.postsSubject.next(posts);
        })
    );

  }



  get posts() {
    return this.POSTS
  }

  getPost(id: number): Observable<IContent> {
    const post = this.http.get<IContent>(`https://jsonplaceholder.typicode.com/photos/${id}`);
    if (post) {
      console.log("si zima od getPost()")
      return post;
    } else {
      return this.http.get<IContent>(`https://jsonplaceholder.typicode.com/photos/${id}`).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.router.navigate(['/404']);
          }
          return throwError(error);
        }),
        tap((p) => {
          this.POSTS.push(p);
        })
      );
    }
  }

  updatePost(id: number, updatedPost: IContent): Observable<IContent> {
    const index = this.POSTS.findIndex((p) => p.id === id);

    if (index >= 0) {

      fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        albumId: 1,
        id: updatedPost.id,
        title: updatedPost.title,
        url: updatedPost.url,
        thumbnailUrl: updatedPost.thumbnailUrl
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => console.log(json));

      this.POSTS[index] = { ...this.POSTS[index], ...updatedPost };
      return of(this.POSTS[index]);
    } else {
      return throwError(`Post with id ${id} not found.`);
    }
  }

  deletePost(id: number): Observable<any> {
  const index = this.POSTS.findIndex((p) => p.id === id);
    if (index >= 0) {

      fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        method: 'DELETE',
      });

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
    fetch(`https://jsonplaceholder.typicode.com/photos/${post.id}`, {
      method: 'POST',
      body: JSON.stringify({
        albumId: 1,
        id: post.id,
        title: post.title,
        url: post.url,
        thumbnailUrl: post.thumbnailUrl
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    .then((response) => response.json())
    .then((json) => console.log(json));

    this.POSTS.push(post);
    console.log('se stavi')
  }
}

