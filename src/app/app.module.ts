import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpModule} from '@angular/http'
import { FormsModule } from '@angular/forms'
import {AppComponent} from './app.component';
import {CategoryAddComponent} from './components/admin/category/category-add/category-add.component';
import {CategoryListComponent} from './components/admin/category/category-list/category-list.component';
import {AppRoutingModule} from "./app-routing.module";
import { CategoryEditComponent } from './components/admin/category/category-edit/category-edit.component';
import { ToastModule,ToastsManager } from 'ng2-toastr/ng2-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxPaginationModule } from 'ngx-pagination';
import { PostListComponent } from './components/admin/post/post-list/post-list.component';
import { PostAddComponent } from './components/admin/post/post-add/post-add.component';
import { PostEditComponent } from './components/admin/post/post-edit/post-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoryAddComponent,
        CategoryListComponent,
        CategoryEditComponent,
        PostListComponent,
        PostAddComponent,
        PostEditComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        NgxPaginationModule
    ],
    providers: [ToastsManager],
    bootstrap: [AppComponent]
})
export class AppModule {
}
