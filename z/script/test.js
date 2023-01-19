attribut.test={
    name:'test',
    items:[],
    images:['🕶️','🎮','🏆','🏅'],
    /* methode d'initialisation*/
    init:function(param){
        console.log(" demarrage de test");
        for(var i=0;i<49;i++){
            attribut.test.items.push(attribut.test.randomImg());
        }
        App.refresh();
    },
    randomImg(){
        var i= Math.round(Math.random()*(attribut.test.images.length-1));
        return attribut.test.images[i];
    }

}