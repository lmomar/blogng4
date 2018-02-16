import {Component, OnInit, ViewContainerRef, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms'
import {CategoryService} from "../../services/category.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $: any;

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

    @Output()  doRefresh = new EventEmitter<boolean>();

    constructor(private servCat: CategoryService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr)
    }

    ngOnInit() {
    }

    addCategory(form: NgForm) {
        if (form.valid) {
            this.servCat.postCategory(form.value.name).subscribe(
                (response) => {
                    if (response.status === 201) {
                        this.doRefresh.emit(true);
                        $('#category_add').modal('hide');
                        this.toastr.success("Category saved successfully", "Success", {
                            "positionClass": "toast-top-center"
                        })
                    }
                },
                (error) => {
                    this.toastr.error("Error: " + error, "Error", {
                        "positionClass": "toast-top-center"
                    })
                }
            )
        }
    }

}
