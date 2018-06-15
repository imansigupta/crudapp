class Item{            //so that we can make a object of it
    constructor(id,name,desc,price,color,url,date){
        this.id = id;       //instance variable = local variable
        this.name = name;
        this.desc = desc;
        this.price= price;
        this.color= color;
        this.url= url;
        this.date= date;
        this.markForDelete=false;
    }
    toggle(){       //here written beacuse it is attached with item object;
        this.markForDelete = !this.markForDelete;
    }
}