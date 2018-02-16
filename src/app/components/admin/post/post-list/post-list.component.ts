import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../../entities/Post";
import {Response} from '@angular/http'
import { DatePipe } from '@angular/common'
declare var $:any;

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    providers: [PostService]
})
export class PostListComponent implements OnInit {

    p: number = 1;
    private posts: Post[];
    private pagination:any = {"page" : 0};
    private post:Post;

    constructor(private servP: PostService) {
    }

    ngOnInit() {
        this.getPostsAction()
    }

    getPostsAction() {
        this.servP.getProductsList(this.p).subscribe(
            (data: Response) => {
                //console.log(data.json()['posts']);
                this.posts = data.json()['posts'];
                this.pagination = data.json()['pagination'];
            },
            (error) => {
                console.error(error)
            }
        )
    }
    showEditPostAction(post:Post){
        this.post = post;
        $('#post_edit').modal();
    }
    refreshData(val:boolean){
        if(val){
            console.log('refreshed');
            this.getPostsAction();
        }
    }
}
