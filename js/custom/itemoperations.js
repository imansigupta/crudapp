const itemOperations = {//as there(operations) object should be made once therefore they are made singelton and when multiple objects are needed then we need to make a class
    itemList:[],    //makes an array 
    add(itemObject){    //function
        this.itemList.push(itemObject);
    },
    searchById(id){
        return this.itemList.filter(itemObject=>itemObject.id==id)[0];
    },
    countMark(){
        return this.itemList.filter(itemObject=>itemObject.markForDelete).length;
    },
    deleteItem(){
        return this.itemList = this.itemList.filter(itemObject=>!itemObject.markForDelete);
    },
    toggleMarking(id){
        this.searchById(id).toggle();
        //itemObject.markForDelete = !itemObject.markForDelete;
    }
}