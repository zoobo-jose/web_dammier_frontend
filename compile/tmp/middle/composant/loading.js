this_={
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
            this_.message=message;
        }
        this_.show=true;
        App.refresh();
    },
     /* cache la page de chargement*/
    hidden(){
        this_.show=false;
        App.refresh();
    }
}