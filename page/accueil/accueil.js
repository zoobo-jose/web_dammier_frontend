attribut.accueil={
    name:'accueil',
    navBarIsCollapsed:false,
    /* methode d'initialisation*/
    init:function(param){
        console.log(" demarrage de accueil");
    },
    collapseNavBar(){
        this_.navBarIsCollapsed=!this_.navBarIsCollapsed;
        animHtmlService.toggleClassFromClass('navbar','hidden');
    },
    hiddeNavBar(){
        if(this_.navBarIsCollapsed){
            this_.navBarIsCollapsed=!this_.navBarIsCollapsed;
            animHtmlService.toggleClassFromClass('navbar','hidden');
        }
    }
}