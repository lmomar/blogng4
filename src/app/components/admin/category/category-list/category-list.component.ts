import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import { Category } from "../../../entities/Category";
import { Response} from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr'


declare var $: any;

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
    providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {
    private categories: any[];
    private category:Category;
    private pagination:any = {"page" : 0};
    p:number = 1;

    constructor(private servCat:CategoryService, private toastr: ToastsManager,vf: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vf)
    }

    ngOnInit() {
        this.getCategoriesListAction(1);
    }

    getCategoriesListAction(page:number){
        this.servCat.getCategoriesList(page).subscribe(
            (data: Response) => {
                this.categories = data['categories'];
                this.pagination = data['pagination'];
            }
                ,
            (error) => console.error(error)
        )
    }

    showEditCategoryAction(category: Category){
        this.category = category;
        //console.log(this.category.id);
        $('#category_edit').modal();
    }
    showDeleteConfirmationAction(category: Category){
        if(confirm("Are you sure to delete "+ category.name)) {
            this.servCat.removeCategory(category.id).subscribe(
                (response: Response) => {
                    this.refreshData(true);
                    this.toastr.success("Category removed successfully", "Success", {
                        "positionClass": "toast-top-center"
                    })
                },
                (error) => {
                    console.error(error)
                }
            )
        }
    }

    refreshData(statu: boolean){
        if(statu){
            this.getCategoriesListAction(1)
        }
    }
    pageChanged(event){
        this.getCategoriesListAction(event);
    }



}
