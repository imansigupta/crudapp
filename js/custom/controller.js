window.addEventListener("load",()=>{
    document.querySelector("#output").innerHTML=0;
    document.querySelector("#price").value=0;
    document.querySelector("#add").addEventListener("click",addItem);
    document.querySelector("#deleteBt").addEventListener("click",deleteItem);
    document.querySelector("#price").addEventListener("change",updatePrice);
    document.querySelector("#save").addEventListener("click",saveItem);
    document.querySelector("#load").addEventListener("click",loadItem);
    });

    const saveItem=()=>{
        var json = JSON.stringify(itemOperations.itemList);  //convert object into string format
        if(localStorage){
            localStorage.mydata = json;
            alert("data saved..");
        }
        else{
            alert("ur browser is outdated...")
        }
    }
    //as only data can be converted in string but not the function
    const loadItem=()=>{
        if(localStorage){
           if(localStorage.mydata){
               //itemOperations.itemList= JSON.parse(localStorage.mydata)          
               var tempList = JSON.parse(localStorage.mydata);       //convert this data into object from string
               tempList.forEach(itemObject=>{
                   let item = new Item(itemObject.id,itemObject.price,itemObject.date,itemObject.url,itemObject.color,itemObject.desc,itemObject.name)
                   itemOperations.add(item);
                   //here the fun toggle is not recieved because in a file all the data is gone in the file and not the function and when the data is retrieved it is added into a list 'templist' which is object type ka object and then the new array of item is made by itrating templist because it do not have the function toggle for deleting and hence we make array of item so that it get the function too. - this is called data massaging
               })
               printItemTable();
               updateCount();   //to show the records count after load
             
           }
        }
        else{
            alert("No data exist in storage...")
        }
    }
    //json - javascript object notation - so that data can be stored in hard disk beacuse intitally object are stored in heap and in this object are stored at reference i.e address and we can not preserve data  in  form of address and hence we use json
    
    const updatePrice=()=>{
        document.querySelector("#output").innerHTML = `<b>${document.querySelector("#price").value}</b>`;
    }

    function deleteItem(){
        itemOperations.deleteItem();
        printItemTable();
        updateCount();
    }

    function addItem(){
        var id = document.querySelector("#itemid").value;
        var name = document.querySelector("#name").value;
        var desc = document.querySelector("#desc").value;
        var price = document.querySelector("#price").value;
        var url = document.querySelector("#url").value;
        var color = document.querySelector("#color").value;
        var date = document.querySelector("#date").value;
        var itemObject = new Item(id, name,desc,price,color,url,date);//creates new object of Item
        itemOperations.add(itemObject);//calls add function of singleton objectr of class itemOperations
        printItem(itemObject);//object passed as an argument
        updateCount();
    }
    
    function printItemTable(){
        var tbody =document.querySelector("#itemtable");
        tbody.innerHTML="";
        itemOperations.itemList.forEach(printItem);
    }

    function printItem(itemObject){
        var itemTable = document.querySelector("#itemtable");//table retrived
        var tr = itemTable.insertRow();//new row added dynamically
       // tr.insertCell(0).innerHTML = itemObject.id;
       // tr.insertCell(1).innerHTML = itemObject.name;
       let index = 0;
       for(let key in itemObject){//traverses object to print values in table using for-in loop
        if(key=="markForDelete"){
            continue;
        }   
        if(key=="url"){
            tr.insertCell(index).innerHTML =`<img class='url' src='${itemObject[key]}'/>`;
            index++;
            continue;    
        }
        if(key=="color"){
            tr.insertCell(index).innerHTML =`<div style='border-radius:50%;width: 20px;height:20px;background-color:${itemObject[key]}'></div>`;
            index++;
            continue;
        }
        tr.insertCell(index).innerHTML = itemObject[key];
           index++;
       }
      var operationTd =  tr.insertCell(index);//insert new cell to row
      var id = itemObject.id;//retrives id of the current object passed
      operationTd.appendChild(createIcon(id,"images/delete.png",toggleMarkUnMark));
      operationTd.appendChild(createIcon(id,"images/edit.png",edit));
    }


    function edit(){
        console.log("edit is called...");
    }
    function toggleMarkUnMark(event){ //here click is a event as click get attached to it and also 'this' is attached to it
    //var img = this;    
    var img = event.srcElement;//retrive source element of the event(here img tag)
        console.log("get the source element ",img);
        var id = img.getAttribute("item-id");
        console.log("Delete is Called....",id);
        //console.log("this is ",this);
        console.log("Parent is ",this.parentNode.parentNode);
        var tr = img.parentNode.parentNode;
        tr.classList.toggle("red");
        itemOperations.toggleMarking(id);
        updateCount();
    }
    
    
    const updateCount = ()=>{
        document.querySelector("#total").innerHTML = itemOperations.itemList.length;
        document.querySelector("#markrecord").innerHTML = itemOperations.countMark();
        document.querySelector("#unmark").innerHTML =itemOperations.itemList.length- itemOperations.countMark();
    }

    function createIcon(id, path,fn){
        var img = document.createElement("img");
        img.src = path;
        img.className = "icon";//dynamically assign class to attribute
        img.setAttribute("item-id", id);
        // img.id = id;
        img.addEventListener("click",fn);
        return img; //returns object of image
    }


    //rest API if for prototyping
    //for fake server use jsonplaceholder
    //or freegeoip.net/jason/*websiteName*
    //webservive is for programmer to programmer coding
    //website is for user
    //REST:-  representational state transfer. - is used for making web service
    //SOAP :- simple object app based protocol
    //string can be transfered over the network but objet cannot be transfered beacuse objects are stored in our memory that is why json is in string form


    //firstly add data in the table and fetch it from the console by copying it and then store it anywhere in ur pc for example in meanstack folder only
    //jason is kept in key - value pair for this add { } in front and end then write { "items":[our data]} and save it as fake.json

    //then open terminal at that loaction 
    //and write json-server --watch fake.json --port 5000

    //on website write localhost:5000/items


    //AJAX- asynchronous javascript and xml
    //ajax forms a non - blocking model that is can load later n we can see other data too like facebook post in which later post can appear first then the previous one.
    //two models :- call bACK model and promise model
        //call back model:- that is when there will be a call or a certain action is performed then it will perform a specific function


//js is single threaded.
//what is thread?
// ans:- code in execution is called thread
// thread = core
//java , .NET - multi threaded

//java script has an infinite loop call EVENT LOOP :- and there is event queue ,event loop responds to function in event queue and then executes it




//var w=100;
//var v;
//var g = {w,v};
//g;  => {w:100 , v}