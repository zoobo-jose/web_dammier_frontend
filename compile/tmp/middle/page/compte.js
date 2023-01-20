attribut.compte={
    name:'compte',
    /* methode d'initialisation*/
    init:function(param){
        console.log(" demarrage de compte");
    }
}

attribut.compte._child0={
    name:'navBar',
    isNoConnected:true,
    /* methode d'initialisation*/
    init:function(){
        console.log(" demarrage de navBar");
    }
}
attribut.compte._child0.isNoConnected=eval("false");

attribut.compte._child1={
    name:'footer',
    /* methode d'initialisation*/
    init:function(){
        console.log(" demarrage de footer");
    }
}