import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/Rx'

@Injectable()
export class CategoryService {
  private apiUrl="http://sfblogapi.local/app_dev.php/api/";



  constructor(private http: Http) { }

  getCategoriesList(page:number){
    return this.http.get(this.apiUrl + 'categories/' + page).map(
        (response: Response) => {
          return response.json();
      }
    );
  }

  postCategory(name:string){
    return this.http.post(this.apiUrl + 'category/add',{"category" : {"name" : name}});
  }

  putCategory(name:string,id:number){
    return this.http.put(this.apiUrl + 'category/edit/' + id,{"category" : {"name" : name}});
  }

  removeCategory(id:number){
    return this.http.delete(this.apiUrl + 'category/remove/' + id);
  }

  getAllCategories(){
    return this.http.get(this.apiUrl + 'categories');
  }

}
