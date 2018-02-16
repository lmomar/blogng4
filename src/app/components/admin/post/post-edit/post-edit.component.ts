import {Component, OnInit, Input, SimpleChanges, ViewContainerRef, Output,EventEmitter} from '@angular/core';
import {Post} from "../../../entities/Post";
import {Category} from "../../../entities/Category";
import {PostService} from "../../services/post.service";
import {CategoryService} from "../../services/category.service";
import {ToastsManager} from 'ng2-toastr'
import {Response} from '@angular/http'
import {NgForm} from '@angular/forms'
declare var $:any;
@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.css'],
    providers: [ToastsManager, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
    @Input() public childPost: Post;
    private editedPost: Post;
    private categories: Category[];
    @Output() refresh = new EventEmitter<boolean>();

    constructor(private servCat: CategoryService, private servP: PostService, private toastr: ToastsManager, vcf: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcf);
    }

    ngOnInit() {
        this.editedPost = new Post(0);
        this.servCat.getAllCategories().subscribe(
            (response: Response) => {
                this.categories = response.json()
            },
            (error) => console.error(error)
        )
    }

    updatePost(form: NgForm) {
        this.servP.updatePost(form.value, this.childPost.id).subscribe(
            (response: Response) => {
                this.refresh.emit(true);
                $('#post_edit').modal('hide');
                this.toastr.success("Post successfully updated","Success",{
                    "positionClass": "toast-top-center"
                })
            },
            (error) => {
                console.error(error)
            }
        )
        ;
    }

    ngOnChanges(change: SimpleChanges) {
        this.editedPost = change.childPost.currentValue;
    }

}
