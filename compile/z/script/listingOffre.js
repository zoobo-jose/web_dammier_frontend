attribut.listingOffre = {
    name: 'listingOffre',
    offres: new Array(),//groupes d'offres afficher
    allOffres: new Array(),// tous les offres
    index: 0,//index du groupe d'offre affiches
    /* mot clee de la recherche*/
    recherche: "",
    /* nombre de resultats*/
    nbrRrsultats: 0,
    /* message a afficher apres la recherche*/
    message: "Meilleurs Site de recherche d'annonces",
    debut:true,
    /* methode d'initialisation*/
    init: function () {
        console.log(" demarrage de listingOffre");
        if(attribut.listingOffre.debut){
            attribut.listingOffre.debut=false;
            attribut.listingOffre.loadDefaultOffres();
        }
    },
    /* charge les offres par defauts*/
    loadDefaultOffres() {
        OffreService.fakeList(80).then(response => {
            attribut.listingOffre.allOffres = response.data; attribut.listingOffre.index = 0;
            attribut.listingOffre.offres = attribut.listingOffre.allOffres[attribut.listingOffre.index];
            attribut.listingOffre.nbrRrsultats = response.nbr;
            // pagination
            attribut.listingOffre.setPagination(attribut.listingOffre.allOffres.length-1,0);
            App.refresh();
        })
    },
    /* lance la recherche des offres*/
    search() {
        let x={a:'a'};
        let y={b:'b',...x};
        console.log(y);

        OffreService.search(attribut.listingOffre.recherche).then(response => {
            attribut.listingOffre.allOffres = response.data; attribut.listingOffre.index = 0;
            attribut.listingOffre.offres = attribut.listingOffre.allOffres[attribut.listingOffre.index];
            // pagination
            attribut.listingOffre.setPagination(attribut.listingOffre.allOffres.length-1,0);
            attribut.listingOffre.nbrRrsultats = response.nbr;
            attribut.listingOffre.setMessage();
            App.refresh();
        })
    },
    setMessage() {
        var nbrPage = attribut.listingOffre.allOffres.length;
        attribut.listingOffre.message = attribut.listingOffre.nbrRrsultats + " resultats pour " +
            attribut.listingOffre.recherche + " - page " + (attribut.listingOffre.index + 1) + "/" + nbrPage;
    },
    setOffres(index) {
        if (index < attribut.listingOffre.allOffres.length && index >= 0) {
            attribut.listingOffre.index = index;
            attribut.listingOffre.offres = attribut.listingOffre.allOffres[index];
            attribut.listingOffre.setMessage();
            App.refresh();
        }
    }
}


attribut.listingOffre._child0={
    max:3,
    list: new Array(),
    pageCourante:0,
    dernierePage:0,
    setPagination(dernierePage,pageCourante){
        attribut.listingOffre._child0.dernierePage=dernierePage;
        attribut.listingOffre._child0.setPageCourante(pageCourante);
    },
    setPageCourante:function(page){
        if(page>=0&&page<=attribut.listingOffre._child0.dernierePage){
            attribut.listingOffre._child0.pageCourante=page;
            attribut.listingOffre._child0.generateList();
            attribut.listingOffre._child0.notify(page);
        }
    },
    next:function(){
        attribut.listingOffre._child0.setPageCourante(attribut.listingOffre._child0.pageCourante+1);
    },
    previous:function(){
        attribut.listingOffre._child0.setPageCourante(attribut.listingOffre._child0.pageCourante-1);
    },
    first:function(){
        attribut.listingOffre._child0.setPageCourante(0);
    },
    last:function(){
        attribut.listingOffre._child0.setPageCourante(attribut.listingOffre._child0.dernierePage);
    },
    generateList:function(){
        var delta=(attribut.listingOffre._child0.max-1)/2;
        var inf=attribut.listingOffre._child0.pageCourante-delta;
        if(inf<0){
            inf=0;
        }
        attribut.listingOffre._child0.list= new Array();
        for(var i=0;i<attribut.listingOffre._child0.max;i++){
            var index=i+inf;
            if(index<=attribut.listingOffre._child0.dernierePage){
                attribut.listingOffre._child0.list[i]={page:index+1,class:""};
                if(index==attribut.listingOffre._child0.pageCourante){
                    attribut.listingOffre._child0.list[i].class="current";
                }
            }
        }
    },
    setPage:function(page){
        attribut.listingOffre._child0.setPageCourante(page-1);
    },
    /* methode a definir par le parent*/
    notify:function(page){
    }
}

