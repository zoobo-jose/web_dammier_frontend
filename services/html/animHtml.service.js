/* 
    service animHtml
*/
var animHtmlService={
    toggleClassFromClass(class1,class2){
            var items=document.getElementsByClassName(class1);
            for(var i=0;i<items.length;i++){
                items[i].classList.toggle(class2);
            }
    },
    toggleClassToItem(item,className){
        item.classList.toggle(className);
    },
    toggleClassToId(id,className){
        item=document.getElementById(id);
        if(item!=null){
            item.classList.toggle(className);
        }
    }
}