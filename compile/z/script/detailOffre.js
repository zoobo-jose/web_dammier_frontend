attribut.detailOffre={
    name:'detailOffre',
    // offre afficher par la page
    offre:null,
    /* methode d'initialisation*/
    init:function(offre){
        attribut.detailOffre.offre=offre;
        App.refresh();
        console.log(" demarrage de detailOffre");
    }
}