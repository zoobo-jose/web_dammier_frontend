const mConsole = require("./util/console");
const mService = require("./core/manageService");
const mFolder= require('./util/folder');
mConsole.params.push(mConsole.newParams('nom du service', '', mConsole.STRING));
mConsole.params.push(mConsole.newParams("chemin d'acces", '', mConsole.STRING));
mConsole.takeParams((params) => {
    var s = params[0].val;
    var path = params[1].val;
    mService.exist(s,
        () => {
            var nameFolder=mService.root+'/'+path;
            mFolder.createFolder(nameFolder,()=>{
                mService.createService(s,path);
                console.log("\n :) ---x le service cree ...\n");
            })
        },
        () => {
            console.log("\n :o ---x le service existe deja ...\n");
        })
})