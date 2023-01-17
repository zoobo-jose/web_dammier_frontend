const mConsole = require("./util/console");
const compile = require("./core/compile");
const mFolder = require('./util/folder');
const fs = require('fs');
mConsole.params.push(mConsole.newParams('nom de la page a supprimer ', '', mConsole.STRING));
mConsole.takeParams((params) => {
    var p = params[0].val;
    compile.pageExist(p,
        () => {
            console.log("\n :o ---x la page n'existe pas ...\n");
        },
        () => {
            compile.removeFromListePage(p, (page, path) => {
                /* suppression des fichiers du composant*/
                var file = compile.getNameFilePage(page, path);
                mFolder.deleteEmptyFolder(file + ".js", () => {
                });
                mFolder.deleteEmptyFolder(file + ".css", () => {
                });
                mFolder.deleteEmptyFolder(file + ".html", () => {
                });
                // /* middle file*/
                file = compile.getNameMiddleFilePage(page);
                fs.rm(file + ".js", { recursive: true }, (err) => {
                })
                fs.rm(file + ".html", { recursive: true }, (err) => {
                })
                // /* z file */
                file = compile.getNameZFileComp(page);
                fs.rm(file.css, { recursive: true }, (err) => {
                })
                fs.rm(file.js, { recursive: true }, (err) => {
                })
                console.log("\n :) ---x page supprimer ...\n");
            })
        })
})
