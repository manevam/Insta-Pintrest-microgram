import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentPartComponent } from './content/content-parts/content-part.component';
import { ContentListComponent } from './content/content-list.component';
import { PostService } from './services/post.service';
import { MoreInfoComponent } from './content/more-info/more-info-post.component';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { EditInfoComponent } from './content/more-info/edit/edit-info.component';
import { NewPostComponent } from './content/new-post/new-post.component';
import { Error404Component } from './errors/404.component';
import { PostActivator } from './content/more-info/post-activator.service';
import { IContent } from './content/content.interface';
import { FormsModule } from '@angular/forms';
import { ConfirmLeaveGuard } from './content/new-post/can-leave.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentPartComponent,
    ContentListComponent,
    MoreInfoComponent,
    EditInfoComponent,
    NewPostComponent,
    Error404Component

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    PostService,
    PostActivator,
    {
      provide: 'canCancelNewPost',
      useValue: checkDirtyState
    },
    ConfirmLeaveGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component: NewPostComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this post. Would you like to cancel? ')
  return true;
}
