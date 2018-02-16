import { Component, OnInit, Input, SimpleChanges, ViewContainerRef,Output,EventEmitter } from '@angular/core';
import {Category} from "../../../entities/Category";
import {CategoryService} from "../../services/category.service";
import { NgForm } from '@angular/forms'
import { Response } from '@angular/http'


import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var $: any;
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() public childCategory:Category ;
  private name:string;

  @Output() doRefresh = new EventEmitter<boolean>();

  constructor(private servCat:CategoryService, public toastr: ToastsManager, vcr: ViewContainerRef) { }

  ngOnInit() {
    this.childCategory = new Category();
  }

  saveAction(form: NgForm) {
    this.servCat.putCategory(this.name,this.childCategory.id).subscribe(
        (response: Response) => {
            if (response.status === 202) {
                this.doRefresh.emit(true);
                //this.refresh = true;
                $('#category_edit').modal('hide');
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


  ngOnChanges(changes:SimpleChanges){
    if(changes.childCategory.currentValue){
      this.name = changes.childCategory.currentValue.name
    }
  }


}
