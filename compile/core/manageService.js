/* sert a la creation de service */
const fs = require('fs');

class ManageService {
    /* fichier contenant le template pour creer un service*/
    template = "compile/template/service/exemple.js";
    /* fichier qui contient la liste des services crees */
    listeService = "compile/tmp/service.txt";
    /* dossier racine ou se trouve les services */
    root="services"

    /* creer un service*/
    createService(nameService,path) {
        fs.readFile(this.template, (err, data) => {
            var val = data + "";
            var tab = val.split("_comp_");
            data = tab.join(nameService);
            fs.writeFile(this.getNameFileService(nameService,path), data, (err) => {
                this.addService(nameService, path);
            })
        })
    }
    /* 
    ajoute le service au registre des service
        le service et son chemin d'acces
     */
    addService(nameService, path) {
        fs.readFile(this.listeService, (err, data) => {
            var val = data + "";
            if (val.length == 0) {
                val = nameService + ";" + path;
            } else {
                val += "," + nameService + ";" + path;
            }
            fs.writeFile(this.listeService, val, (err) => {

            })
        })
    }
    /* indique si un service avec le meme nom existe deja */
    exist(nameService,callBack , callBackExist) {
        fs.readFile(this.listeService, (err, data) => {
            var val = data + "";
            var tab = val.split(',');
            var exist=false;
            for (var i = 0; i < tab.length; i++) {
                var x = tab[i].split(';');
                if (x[0] == nameService) {
                    exist=true;
                    callBackExist();
                    break;
                }
            }
            if(!exist){
                callBack();
            }
        })
    }
    removeFromListeService(nameService,callBack){
        fs.readFile(this.listeService, (err, data) => {
            var val = data + "";
            var tab = val.split(',');
            var s=null;
            for (var i = 0; i < tab.length; i++) {
                var x = tab[i].split(';');
                if (x[0] == nameService) {
                   s=x;
                   tab[i]="";
                }else{
                    if(i<tab.length-1){
                        var x = tab[i+1].split(';');
                        if (i<tab.length-2||x[0] !=nameService){
                            tab[i]+=",";
                        }
                    }
                }
            }
            val=tab.join('');
            fs.writeFile(this.listeService,val,'utf-8',(err)=>{
                if(s!=null){
                    callBack(s[0],s[1]);
                }
            });
        })
    }
    getNameFileService(nameService,path) {
        if(path.length==0){
            return this.root+'/'+nameService + ".service.js"
        }
        return this.root+'/'+path+"/" + nameService + ".service.js";
    }
}
module.exports = new ManageService();
