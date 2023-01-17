const fs = require('fs');
const mService = require('./manageService');
class compile {
    /* liste des composant*/
    comps = [
        'super',
        'jose'];
    js = '';
    css = '';
    html = '';
    current = 0;
    next = 0;
    /* fichier contenant la liste des composant*/
    listeComposant = "compile/tmp/composant.txt";
    /* fichier contenant la liste des pages*/
    listePage = "compile/tmp/page.txt";
    /**/
    rootComp = "composant";
    /**/
    rootPage="page";
    /* root des middleFile*/
    rootMiddle = "compile/tmp/middle";
    /* root des z*/
    rootZ = "z/";
    /*
         methode pour creer un composant
    */
    create(compName, type, path) {

        var root = "composant";
        if (type == 'page') {
            root = "page";
        }
        const folder = root + '/' + path;
        const fileJs = {
            name: folder + '/' + compName + ".js",
            content: '',
        }
        const fileCss = {
            name: folder + '/' + compName + ".css",
            content: '/* css de ' + compName + '*/',
        }
        const fileHTML = {
            name: folder + '/' + compName + ".html",
            content: '/* html de ' + compName + ' hum*/',
        }
        /* Js file*/
        fs.readFile('compile/template/' + root + '/exemple.js', 'utf8', (err, data) => {
            fileJs.content = data;
            var contenu = fileJs.content;
            var re = /_comp_/;
            var tab = contenu.split(re);
            fileJs.content = tab.join(compName);
            fs.writeFile(fileJs.name, fileJs.content, 'utf8', (err) => {
            })
        });
        /* css file*/
        fs.readFile('compile/template/' + root + '/exemple.css', 'utf8', (err, data) => {
            fileCss.content = data;
            var contenu = fileCss.content;
            var re = /_comp_/;
            var tab = contenu.split(re);
            fileCss.content = tab.join(compName);
            fs.writeFile(fileCss.name, fileCss.content, 'utf8', (err) => {
            })
        });
        /* HTML file*/
        fs.readFile('compile/template/' + root + '/exemple.html', 'utf8', (err, data) => {
            fileHTML.content = data;
            var contenu = fileHTML.content;
            var re = /_comp_/;
            var tab = contenu.split(re);
            fileHTML.content = tab.join(compName);
            fs.writeFile(fileHTML.name, fileHTML.content, 'utf8', (err) => {
            })
        });
    }
    add(compName, type, path) {
        var tmp = 'compile/tmp/composant.txt';
        if (type == "page") {
            tmp = 'compile/tmp/page.txt';
        }
        /* mise a jour de la liste des composant*/
        fs.readFile(tmp, 'utf8', (err, data) => {
            var contenu = data;
            var re = /,/;
            var tab = contenu.split(re);
            var exist = false;
            for (var i = 0; i < tab.length; i++) {
                if (tab[i] == compName) {
                    exist = true; break;
                }
            }
            if (!exist) {
                if (data.length != 0) {
                    contenu = data + "," + compName + ";" + path;
                } else {
                    contenu = compName + ";" + path;
                }
                fs.writeFile(tmp, contenu, 'utf8', (err) => {
                })
                this.create(compName, type, path);
            }
        });

    }
    display(type) {
        var tmp = 'compile/tmp/composant.txt';
        var title = "liste des composants";
        if (type == "page") {
            tmp = 'compile/tmp/page.txt';
            title = "  liste des pages   ";
        }
        fs.readFile(tmp, 'utf8', (err, data) => {
            var contenu = data;
            if(data.length!=0){
                var re = /,/;
                var tab = contenu.split(re);
                console.log('--------------------------------------');
                console.log('------- '+title+' ---------');
                console.log('--------------------------------------');
                for (var i = 0; i < tab.length; i++) {
                    var val = tab[i].split(';');
                    console.log('| comp = ' + val[0] + ' ; path = "' + val[1] + '"');
                    console.log('--------------------------------------');
                }
            }else{
                console.log('\n:o --! liste vide ... :o --!\n');
            }
        });
    }
    generate2(index) {
        if (index >= this.comps.length) {
            this.generateService();
        } else {
            var page = this.comps[index];
            var comp = page.type;
            var linkcss = 'z/css/' + comp;
            var link2 = 'z/script/' + comp;
            var linkHtml = 'compile/tmp/middle/page/' + comp;
            this.css += "\n<link href='" + linkcss + ".css' rel='stylesheet'>";
            /* si il s'agit d'une page on importe le js  et le html*/
            if (page.page) {
                this.js += "\n<script type='text/javascript' src='" + link2 + ".js'></script>";
                fs.readFile(linkHtml + '.html', 'utf8', (err, data) => {
                    if (data != undefined) {
                        this.html += "\n" + data;
                    }
                    this.generate2(index + 1);
                })
            } else {
                this.generate2(index + 1);
            }
        }
    }
    generate() {
        fs.readFile('compile/tmp/page.txt', 'utf8', (err, data) => {
            var re = /,/;
            this.comps = new Array();
            var pages = data.split(re);
            for (var i = 0; i < pages.length; i++) {
                var val = pages[i].split(';');
                var page = this.newComposant();
                page.type = val[0];
                page.path = val[1];
                page.page = true;
                this.comps.push(page);
            }
            fs.readFile('compile/tmp/composant.txt', 'utf8', (err, data) => {
                var contenu = data;
                var re = /,/;
                var comp = contenu.split(re);
                for (var i = 0; i < comp.length; i++) {
                    var val = comp[i].split(';');
                    var page = this.newComposant();
                    page.type = val[0];
                    page.path = val[1];
                    this.comps.push(page);
                }
                this.generate2(0);
            });
        });
    }
    generateService() {
        fs.readFile("compile/tmp/service.txt", (err, data) => {
            var val = data + "";
            if(val.length!=0){
                var tab = val.split(',');
                this.js += "\n<!-- les services -->"
                for (var i = 0; i < tab.length; i++) {
                    var x = tab[i].split(';');
                    var file = mService.getNameFileService(x[0], x[1]);
                    this.js += "\n<script type='text/javascript' src='" + file + "'></script>";
                }
            }
            this.completeTemplate();
        })
        // fs.readdir('services', (err, files) => {
        //     this.js += "\n<!-- les services -->"
        //     for (var i = 0; i < files.length; i++) {
        //         this.js += "\n<script type='text/javascript' src='services/" + files[i] + "'></script>";
        //     }
        //     this.completeTemplate();
        // })
    }
    completeTemplate() {
        /* HTML file*/
        fs.readFile('compile/template/index.html', 'utf8', (err, data) => {
            var contenu = data;
            var re = /_js_/;
            var tab = contenu.split(re);
            contenu = tab.join(this.js);
            re = /_css_/;
            tab = contenu.split(re);
            contenu = tab.join(this.css);
            re = /_html_/;
            tab = contenu.split(re);
            contenu = tab.join(this.html);
            re = /\n/;
            tab = contenu.split(re);
            contenu = tab.join('');
            fs.writeFile('index.html', contenu, 'utf8', (err) => {
                console.log('...................................')
                console.log(".                                 .");
                console.log("..                               ..");
                console.log("...                             ...");
                console.log(".  :) generation terminee ( Z )   .");
                console.log("...                             ...");
                console.log("..                               ..");
                console.log(".                                 .");
                console.log('...................................');
            })
        });
    }
    test() {
        fs.mkdir('test/test/hum', (err) => { });
    }
    hum(i) {
        fs.readFile('test.txt', 'utf8', (err, data) => {
            setTimeout(() => {
                if (this.current == i) {
                    console.log("--- " + data);
                    fs.writeFile('test.txt', data + i, 'utf8', (err) => {
                        this.current++;
                        if (i < 9) {
                            this.hum(i + 1);
                        }
                    })
                } else {
                    this.hum(i);
                }
            }, 3);
        })
    }
    /* permet de creer un nouveau composant a mettre dans comp ou 
    une page a mettre dans page */
    newComposant() {
        return {
            type: "",// type du composant
            sub: new Array(),// type des sous composant contenu dans notre composant
            path: "",// chemin dans lequel est contenu notre composant
            page: false//indique si le composant est une page
        }
    }
    /* indique si un composant existe avec le meme nom existe deja */
    ComposantExist(nameComp, callBack, callBackExist) {
        fs.readFile(this.listeComposant, (err, data) => {
            var val = data + "";
            var tab = val.split(',');
            var exist = false;
            for (var i = 0; i < tab.length; i++) {
                var x = tab[i].split(';');
                if (x[0] == nameComp) {
                    exist = true;
                    callBackExist();
                    break;
                }
            }
            if (!exist) {
                callBack();
            }
        })
    }
    /* indique si une page avec le meme nom existe deja */
    pageExist(namePage, callBack, callBackExist) {
        fs.readFile(this.listePage, (err, data) => {
            var val = data + "";
            var tab = val.split(',');
            var exist = false;
            for (var i = 0; i < tab.length; i++) {
                var x = tab[i].split(';');
                if (x[0] == namePage) {
                    exist = true;
                    callBackExist();
                    break;
                }
            }
            if (!exist) {
                callBack();
            }
        })
    }
    /* enleve le composant de la liste de composant*/
    removeFromListeComposant(nameComp, callBack) {
        fs.readFile(this.listeComposant, (err, data) => {
            var val = data + "";
            var tab = val.split(',');
            var s = null;
            for (var i = 0; i < tab.length; i++) {
                var x = tab[i].split(';');
                if (x[0] == nameComp) {
                    s = x;
                    tab[i] = "";
                } else {
                    if (i < tab.length - 1) {
                        var x = tab[i + 1].split(';');
                        if (i < tab.length - 2 || x[0] != nameComp) {
                            tab[i] += ",";
                        }
                    }
                }
            }
            val = tab.join('');
            fs.writeFile(this.listeComposant, val, 'utf-8', (err) => {
                if (s != null) {
                    callBack(s[0], s[1]);
                }
            });
        })
    }
    /* enleve la page de la liste de page*/
    removeFromListePage(namePage, callBack) {
        fs.readFile(this.listePage, (err, data) => {
            var val = data + "";
            var tab = val.split(',');
            var s = null;
            for (var i = 0; i < tab.length; i++) {
                var x = tab[i].split(';');
                if (x[0] == namePage) {
                    s = x;
                    tab[i] = "";
                } else {
                    if (i < tab.length - 1) {
                        var x = tab[i + 1].split(';');
                        if (i < tab.length - 2 || x[0] != namePage) {
                            tab[i] += ",";
                        }
                    }
                }
            }
            val = tab.join('');
            fs.writeFile(this.listePage, val, 'utf-8', (err) => {
                if (s != null) {
                    callBack(s[0], s[1]);
                }
            });
        })
    }
    getNameFileComp(nameComp, path) {
        if (path.length == 0) {
            return this.rootComp + "/" + nameComp;
        }
        return this.rootComp + '/' + path + "/" + "/" + nameComp;
    }
    getNameFilePage(namePage, path) {
        if (path.length == 0) {
            return this.rootPage + "/" + namePage;
        }
        return this.rootPage + '/' + path + "/" + "/" + namePage;
    }
    getNameMiddleFileComp(nameComp) {
        return this.rootMiddle + "/composant/" + nameComp;
    }
    getNameMiddleFilePage(namePage) {
        return this.rootMiddle + "/page/" + namePage;
    }
    getNameZFileComp(nameComp) {
        return {
            css: this.rootZ + "/css/" + nameComp + ".css",
            js: this.rootZ + "/script/" + nameComp + ".js"
        };
    }
}
module.exports = new compile();