const mConsole = require("./util/console");
const mService = require("./core/manageService");
const mFolder= require('./util/folder');
mConsole.params.push(mConsole.newParams('nom du service a supprimer ', '', mConsole.STRING));
mConsole.takeParams((params) => {
    var s = params[0].val;
    mService.exist(s,
        () => {
            console.log("\n :o ---x le service n'existe pas ...\n");
        },
        () => {
            mService.removeFromListeService(s,(service,path)=>{
                var file=mService.getNameFileService(service,path);
                mFolder.deleteEmptyFolder(file,()=>{
                    console.log("\n :) ---x le service supprimer ...\n");
                })
            })
        })
})
