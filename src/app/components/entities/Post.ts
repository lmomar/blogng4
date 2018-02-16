export class Post{
    id?:number;
    title: string;
    body: Text;
    created_at?: Date;
    enabled: boolean;
    category:Object;
    constructor(id:number){
        this.category = new Object({'id' : id})
    }

}