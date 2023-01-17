const mConsole = require("./util/console");
const compile = require("./core/compile");
const mFolder = require('./util/folder');
const fs = require('fs');
mConsole.params.push(mConsole.newParams('nom du composant a supprimer ', '', mConsole.STRING));
mConsole.takeParams((params) => {
    var c = params[0].val;
    compile.ComposantExist(c,
        () => {
            console.log("\n :o ---x le composant n'existe pas ...\n");
        },
        () => {
            compile.removeFromListeComposant(c, (comp, path) => {
                /* suppression des fichiers du composant*/
                var file = compile.getNameFileComp(comp, path);
                mFolder.deleteEmptyFolder(file + ".js", () => {
                });
                mFolder.deleteEmptyFolder(file + ".css", () => {
                });
                mFolder.deleteEmptyFolder(file + ".html", () => {
                });
                /* middle file*/
                file = compile.getNameMiddleFileComp(comp);
                fs.rm(file + ".js", { recursive: true }, (err) => {
                })
                fs.rm(file + ".html", { recursive: true }, (err) => {
                })
                /* z file */
                file = compile.getNameZFileComp(comp);
                fs.rm(file.css, { recursive: true }, (err) => {
                })
                console.log("\n :) ---x composant supprimer ... (<o> .. <o>)\n");
            })
        })
})
