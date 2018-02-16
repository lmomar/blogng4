import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import {Post} from "../../entities/Post";
@Injectable()
export class PostService{
    private apiUrl="http://sfblogapi.local/app_dev.php/api/";


    constructor(private http: Http){

    }

    getProductsList(page: number){
        return this.http.get(this.apiUrl + 'posts/' + page);
    }

    addPost(post: Post){
        return this.http.post(this.apiUrl + 'post/add',{"post" : post});
    }

    updatePost(post:Post,id:number){
        return this.http.put(this.apiUrl + 'post/edit/' + id,{"post" : post});
    }

    removePost(id:number){
        return this.http.delete(this.apiUrl + 'post/remove/' + id)
    }

}