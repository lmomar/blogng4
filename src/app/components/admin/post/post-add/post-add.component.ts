import {Component, OnInit, ViewContainerRef,Output,EventEmitter} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {PostService} from "../../services/post.service";
import {Category} from "../../../entities/Category";
import { Response } from '@angular/http'
import { NgForm} from '@angular/forms'
import {ToastsManager} from 'ng2-toastr'

declare var $:any;

@Component({
    selector: 'app-post-add',
    templateUrl: './post-add.component.html',
    styleUrls: ['./post-add.component.css'],
    providers: [CategoryService, PostService]
})
export class PostAddComponent implements OnInit {

    private categories:Category[];
    @Output() refresh = new EventEmitter<boolean>();

    constructor(private servCat:CategoryService,private servP:PostService,private toastr:ToastsManager,vcf:ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcf)
    }

    ngOnInit() {
        this.servCat.getAllCategories().subscribe(
            (data: Response) => this.categories = data.json(),
            (error) => console.error(error)
        )
    }

    addPost(form:NgForm){
        this.servP.addPost(form.value).subscribe(
            (response: Response) => {
                this.refresh.emit(true);
                $('#product_add').modal('hide');
                this.toastr.success("Post saved successfully",'Success',{"positionClass": "toast-top-center"});
            },
            (error) => this.toastr.error("Error :" + error,"Failed",{"positionClass": "toast-top-center"})
        )
    }

}
