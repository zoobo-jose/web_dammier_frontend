/* 
    service animHtml
*/
var animHtmlService={
    toggleClassFromClass(class1,class2){
            var items=document.getElementsByClassName(class1);
            for(var i=0;i<items.length;i++){
                items[i].classList.toggle(class2);
            }
    }
}