attribut.accueil={
    name:'accueil',
    navBarIsCollapsed:false,
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
    }
}

attribut.accueil._child0={
    name:'navBar',
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