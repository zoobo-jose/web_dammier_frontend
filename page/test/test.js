attribut.test={
    name:'test',
    items:[],
    images:['👑','🕶️','🎮','🏆','🏅'],
    /* methode d'initialisation*/
    init:function(param){
        console.log(" demarrage de test");
        for(var i=0;i<49;i++){
            this_.items.push(this_.randomImg());
        }
        App.refresh();
    },
    randomImg(){
        var i= Math.round(Math.random()*(this_.images.length-1));
        return this_.images[i];
    }

}