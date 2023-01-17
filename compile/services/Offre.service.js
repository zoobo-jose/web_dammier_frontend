/* 
    service Offre
*/
var FormatOffre={
    createEmptyItem:function(){
        return {
            id:0,//id de l'offre
            idUser:0,//id de l'utilisateur
            title:"",// son titre
            description:"",// sa description
            urlImg:"",// url de sont image
            dateCreation:"",//sa date de creation
            nbreVues:0,//son nombre de vue
            prize:0,//son prix en frcfa
            type:0,// son type 
            tab:[['a','b','c','d'],['a','b','c','d'],['a','b','c','d'],['a','b','c','d']]
        }
    }
}
var OffreService={
    taillePacket:12,//taille des packets d'offres
    fakeList:function(n){
        var tab=new Array();// tableau de tableau des offres
        var vals= new Array();// tableau des offres
        for(var i=0;i<n;i++){
        
            var val= FormatOffre.createEmptyItem();
            var img=Math.round(6*Math.random())+1;
            val.id=i;
            val.title="titre "+i;
            val.description="est un shōnen manga écrit et dessiné par Masashi Kishimoto. Naruto a été prépublié dans l'hebdomadaire Weekly Shōnen Jump de l'éditeur . "+i;
            val.urlImg="z/www/img/bg"+img+".jpg";
            val.nbreVues=100*i*i+11*i;

            vals.push(val);
            if(vals.length==OffreService.taillePacket||i==n-1){
                tab.push(vals);
                vals= new Array();
            }
        }
        /*
            nbr est le nombres de resultats total trouves
        */
        return new Promise((resolve, reject) => {resolve({data:tab,nbr:n}); });
    },
    /* 
        fonction pour faire la recherche 
        todo: a implementer
    */
    search:function(text){
        var nbr=Math.round(100*Math.random());
        return this.fakeList(nbr);
    },
    /* 
        avoir une offre a partir de son id
    */
    get:function(id){
        var val= FormatOffre.createEmptyItem();
        var img=Math.round(6*Math.random())+1;
        var i=Math.round(100*Math.random())+1;
        val.id=id;
        val.title="Naruto Shippuden namikaze "+i;
        val.description="est un shōnen manga écrit et dessiné par Masashi Kishimoto. Naruto a été prépublié dans l'hebdomadaire Weekly Shōnen Jump de l'éditeur . "+i;
        val.urlImg="www/img/bg"+img+".jpg";
        val.nbreVues=100*i*i+11*i;
        return new Promise((resolve, reject) => {resolve(val)});
    }
}