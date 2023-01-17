const c = require('./core/compile');
const fs = require('fs');
const mFolder= require('./util/folder');
const mConsole=require("./util/console");
const compile = require("./core/compile");

var page='';
var path='';
const type='page';
var nodes="";
var root='page';
var pathMiddle="compile/tmp/middle/page/";

function exe(){
    if(path.length==0){
        path=page;
    }else{
        path+="/"+page;
    }
    nodes=path.split('/');
    /* creation des fichier brouillon */
    pathMiddle+=page;
    fs.writeFile(pathMiddle+".js", "", 'utf8', (err) => {
    })
    fs.writeFile(pathMiddle+".html", "", 'utf8', (err) => {
    })
    mFolder.createFolder(root+"/"+path,c.add(page, type, path));
}
mConsole.params.push(mConsole.newParams('nom de la page','',mConsole.STRING));
mConsole.params.push(mConsole.newParams("chemin d'acces",'',mConsole.STRING));
mConsole.takeParams((params)=>{
    page = params[0].val;
    path = params[1].val;
    compile.pageExist(page,
        () => {
            exe();
        },
        () => {
            console.log("\n :o ---x la page existe deja ...\n");
        })
})


