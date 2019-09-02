import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SuperformsModule } from './superforms/superforms.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes[] = [

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true }
    // ),
    NgbModule,
    SuperformsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
