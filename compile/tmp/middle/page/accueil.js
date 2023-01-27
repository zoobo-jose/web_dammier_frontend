attribut.accueil={
    navBarIsCollapsed:false,
    name:'Erico',/* nom de l'utilisateur*/
    tel:0,/* tel de l'utilisateur*/
    passWord:'',/* mot de passe de l'utilisateur*/
    passWord2:'',/* mot de passe de l'utilisateur pour verifier*/
    /* methode d'initialisation*/
    init:function(param){
        console.log(" demarrage de accueil");
    },
    collapseNavBar(){
        attribut.accueil.navBarIsCollapsed=!attribut.accueil.navBarIsCollapsed;
        animHtmlService.toggleClassFromClass('navbar','hidden');
    },
    hiddeNavBar(){
        if(attribut.accueil.navBarIsCollapsed){
            attribut.accueil.navBarIsCollapsed=!attribut.accueil.navBarIsCollapsed;
            animHtmlService.toggleClassFromClass('navbar','hidden');
        }
    },
    connectUser(){
        attribut.accueil.showLoadingPage("attente du serveur ...");
        userService.connect(attribut.accueil.tel,attribut.accueil.passWord).then((data)=>{
            attribut.accueil.hiddenLoadingPage();
            App.navigate("compte");
        })
    },
    showLoadingPage:null,/* affiche le composant d'attente , definie par ce dernier*/
    hiddenLoadingPage:null,/* cache le composant d'attente , definie par ce dernier*/
}

attribut.accueil._child0={
    name:'navBar',
    isNoConnected:true,
    /* methode d'initialisation*/
    init:function(){
        console.log(" demarrage de navBar");
    }
}

attribut.accueil._child1={
    name:'footer',
    /* methode d'initialisation*/
    init:function(){
        console.log(" demarrage de footer");
    }
}

attribut.accueil._child2={
    name:'loading',
    message:'connection au serveur',
    show:false,
    /* methode d'initialisation*/
    init:function(){
        console.log(" demarrage de loading");
    },
    /* affiche la page de chargement avec un message*/
    showed(message){
        if(message!=null){
            attribut.accueil._child2.message=message;
        }
        attribut.accueil._child2.show=true;
        App.refresh();
    },
     /* cache la page de chargement*/
    hidden(){
        attribut.accueil._child2.show=false;
        App.refresh();
    }
}
//_a_b_cFri Jan 27 2023 15:47:23 GMT+0100 (West Africa Standard Time)
attribut.accueil.showLoadingPage=attribut.accueil._child2.showed;
//_a_b_cFri Jan 27 2023 15:47:23 GMT+0100 (West Africa Standard Time)
//_a_b_cFri Jan 27 2023 15:47:23 GMT+0100 (West Africa Standard Time)
attribut.accueil.hiddenLoadingPage=attribut.accueil._child2.hidden;
//_a_b_cFri Jan 27 2023 15:47:23 GMT+0100 (West Africa Standard Time)