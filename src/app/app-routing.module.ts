import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryListComponent} from "./components/admin/category/category-list/category-list.component";
import {AppComponent} from "./app.component";
import {PostListComponent} from "./components/admin/post/post-list/post-list.component";

const routes: Routes =[
    {
        path: '',
        redirectTo: 'admin/categories',
        pathMatch: 'full',
    },
    {
        path: 'admin/categories',
        component: CategoryListComponent
    },
    {
        path: 'admin/posts',
        component: PostListComponent
    }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule{

}