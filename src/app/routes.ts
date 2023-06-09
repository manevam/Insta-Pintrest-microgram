import { Routes } from "@angular/router";
import { ContentListComponent } from "./content/content-list.component";
import { MoreInfoComponent } from "./content/more-info/more-info-post.component";
import { EditInfoComponent } from "./content/more-info/edit/edit-info.component";
import { NewPostComponent } from "./content/new-post/new-post.component";
import { Error404Component } from "./errors/404.component";
import { PostActivator } from "./content/more-info/post-activator.service";
import { ConfirmLeaveGuard } from "./content/new-post/can-leave.service";


export const appRoutes: Routes = [
  { path: 'posts/new', component: NewPostComponent, canDeactivate: [ConfirmLeaveGuard]},
  { path: 'posts', component: ContentListComponent},
  { path: 'edit/:id', component: EditInfoComponent },
  { path: 'posts/:id', component: MoreInfoComponent, canActivate: [PostActivator] },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', redirectTo: '/posts' }
]
