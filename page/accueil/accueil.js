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
        this_.navBarIsCollapsed=!this_.navBarIsCollapsed;
        animHtmlService.toggleClassFromClass('navbar','hidden');
    },
    hiddeNavBar(){
        if(this_.navBarIsCollapsed){
            this_.navBarIsCollapsed=!this_.navBarIsCollapsed;
            animHtmlService.toggleClassFromClass('navbar','hidden');
        }
    },
    connectUser(){
        this_.showLoadingPage("attente du serveur ...");
        userService.connect(this_.tel,this_.passWord).then((data)=>{
            this_.hiddenLoadingPage();
            sonService.test();
            alert('hum');
            App.navigate("compte");
        })
    },
    showLoadingPage:null,/* affiche le composant d'attente , definie par ce dernier*/
    hiddenLoadingPage:null,/* cache le composant d'attente , definie par ce dernier*/
}