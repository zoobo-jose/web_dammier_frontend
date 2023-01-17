attribut.accueil={
    name:'accueil',
    /* methode d'initialisation*/
    init:function(param){
        console.log(" demarrage de accueil");
    },
    collapseNavBar(){
        animHtmlService.toggleClassFromClass('navbar','hidden');
    }
}