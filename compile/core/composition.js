/* scripot pour faire la compostion de composant */
const compile = require('./compile');
const fs = require('fs');
class Composition {
    /*
     tableau de booleen indiquant si un composant 
     est generer
    */
    generer = new Array();
    /* tableau contenant les composants */
    comp = new Array();
    /* indexe du composant courant*/
    c = 0;
    /* indexe du sous composant courant */
    sc = 0;
    /* tableau contenant les pages */
    page = new Array();
    /* indexe de la page courant*/
    p = 0;
    /* indexe du sous composant de la page courante*/
    sp = 0;
    /* separateur des composant*/
    delComp = /<comp@\s*\n*\s*\n*|\s*\n*\s*\n*@>/;
    vide = /\s+\n*\s*\n*|\s*\n+\s*\n*/;
    vide2 = /[\s\n]*,[\s\n]*/;
    /* indexer de composant*/
    indexer = "this_";
    /* indexer de variable unique*/
    indexerVar = "_v_";
    indexVar = 0;// aide a le rendre unique
    /* */
    indexerParent = 'parent_';
    /**/
    subStape = 0;
    GENARATE_JS = 0;
    GENARATE_HTML = 1;
    /* relation entre les composant et page */
    _relation = "";
    /* marquer de declaration*/
    _delRelation = "//_a_b_c" + Date();
    /* empeche d'interpreter les mots clee*/
    _antiMotClee = '/';
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
    /*
     met a jour les fichiers brouillon avant de commencer la composition
     N.B: toujours l'utiliser avec etape=0
    */
    updateMiddle(etape) {
        if (etape == 0) {
            /* recuperer la liste des pages*/
            fs.readFile('compile/tmp/page.txt', 'utf8', (err, data) => {
                var contenu = data;
                if(contenu.length>0){
                    var re = /,/;
                    var tab = contenu.split(re);
                    for (var i = 0; i < tab.length; i++) {
                        var page = this.newComposant();
                        var val = tab[i].split(';');
                        page.type = val[0];
                        page.path = val[1];
                        page.page = true;
                        this.comp.push(page);
                    }
                }
                console.log(this.page);
                /* recuperer la liste des composants*/
                fs.readFile('compile/tmp/composant.txt', 'utf8', (err, data) => {
                    var contenu = data;
                    if(contenu.length>0){
                        var re = /,/;
                        var tab = contenu.split(re);
                        for (var i = 0; i < tab.length; i++) {
                            var page = this.newComposant();
                            var val = tab[i].split(';');
                            page.type = val[0];
                            page.path = val[1];
                            this.comp.push(page);
                        }
                    }
                    /* copier les pages */
                    this.updateMiddle(2);
                });
            });
        }
        /* copier les pages */
        // if (etape == 1) {
        //     var path1 = 'page/' + this.page[this.p].path + '/' + this.page[this.p].type;
        //     var path2 = 'compile/tmp/middle/page/' + this.page[this.p].type;
        //     fs.copyFile(path1 + ".js", path2 + ".js", (err) => {
        //         fs.copyFile(path1 + ".html", path2 + ".html", (err) => {
        //             if (this.p + 1 < this.page.length) {
        //                 this.p++;
        //                 this.updateMiddle(1);
        //             } else {
        //                 this.p = 0;
        //                 /* copier les composants */
        //                 this.updateMiddle(2);
        //             }
        //         })
        //     })
        // }
        /* copier les composants */
        if (etape == 2) {
            var root = "composant";
            if (this.comp[this.c].page) {
                root = "page";
            }
            var path1 = root + '/' + this.comp[this.c].path + '/' + this.comp[this.c].type;
            var path2 = 'compile/tmp/middle/' + root + '/' + this.comp[this.c].type;
            fs.copyFile(path1 + ".js", path2 + ".js", (err) => {
                fs.copyFile(path1 + ".html", path2 + ".html", (err) => {
                    if (this.c + 1 < this.comp.length) {
                        this.c++;
                        this.updateMiddle(2);
                    } else {
                        this.c = 0;
                        // completer comp et page
                        this.completeComp();
                    }
                })
            })
        }
    }
    // completer comp et page
    completeComp() {
        // completer comp
        if (this.c < this.comp.length) {
            var root = "composant";
            if (this.comp[this.c].page) {
                root = "page";
            }
            var fileName = 'compile/tmp/middle/' + root + '/' + this.comp[this.c].type + ".html";
            fs.readFile(fileName, 'utf8', (err, c_html) => {
                var tab = c_html.split(this.delComp);
                for (var i = 1; i < tab.length; i += 2) {
                    var val = tab[i].split(this.vide);
                    var comp = -1;
                    for (var j = 0; j < this.comp.length; j++) {
                        if (this.comp[j].type == val[0]) {
                            comp = j;
                        }
                    }
                    if (!this.comp[this.c].sub.includes(comp)) {
                        this.comp[this.c].sub.push(comp);
                    }
                }
                this.c++; this.completeComp();
            })
        } else {
            this.c = 0;
            console.log(this.comp);
            // mettre a jour generer
            this.generer = new Array();
            for (var i = 0; i < this.comp.length; i++) {
                this.generer.push(false);
            }
            // composition
            this.composition();
        }
        // if (etape == 1) {
        //     if (this.p < this.page.length) {
        //         var fileName = 'compile/tmp/middle/page/' + this.page[this.p].type + ".html";
        //         fs.readFile(fileName, 'utf8', (err, c_html) => {
        //             var tab = c_html.split(this.delComp);
        //             for (var i = 1; i < tab.length; i += 2) {
        //                 var val = tab[i].split(this.vide);
        //                 var comp = -1;
        //                 for (var j = 0; j < this.comp.length; j++) {
        //                     if (this.comp[j].type == val[0]) {
        //                         comp = j;
        //                     }
        //                 }
        //                 if (!this.page[this.c].sub.includes(comp)) {
        //                     this.page[this.c].sub.push(comp);
        //                 }
        //             }
        //             this.p++; this.completeComp(1);
        //         })
        //     } else {
        //         this.p = 0;
        //         console.log(this.page);
        //         console.log(this.comp);
        // // mettre a jour generer
        // this.generer = new Array();
        // for (var i = 0; i < this.comp.length; i++) {
        //     this.generer.push(false);
        // }
        //         // composition
        //         this.composition();
        //     }
        // }
    }
    /* verifier si tous les composants sont generer */
    allCompIsGenerated() {
        for (var i = 0; i < this.generer.length; i++) {
            if (!this.generer[i]) {
                return false;
            }
        }
        return true;
    }
    /* retourne si les sous composant de c sont tous genere*/
    subCompIsGenerated() {
        for (var i = 0; i < this.comp[this.c].sub.length; i++) {
            var sc = this.comp[this.c].sub[i];
            if (!this.generer[sc]) {
                return false;
            }
        }
        return true;
    }
    /* composition des composants*/
    composition() {
        if (!this.allCompIsGenerated()) {
            if (!this.generer[this.c] && this.subCompIsGenerated()) {
                this.addSub();
            } else {
                setTimeout(() => {
                    if (this.c + 1 < this.comp.length) {
                        this.c++;
                    } else { this.c = 0 }
                    this.composition();
                }, 10);
            }
        } else {
            // copier les fichier resultant dans z
            this.copyMiddleToZ(0);
        }
    }
    /**/
    addSub() {
        if (this.sc < this.comp[this.c].sub.length && this.subStape == this.GENARATE_JS) {
            /* modifier le js de c */
            this.modifyParentJs();
        } else
            if (this.sc < this.comp[this.c].sub.length && this.subStape == this.GENARATE_HTML) {
                /* modifier le html de c */
                this.modifyParentHtml();

            } else {
                this.addIndexer();
            }
    }
    /* ajoute l'indexer a c  si c est une page dans son html et son css*/
    addIndexer() {
        var root = "composant";
        if (this.comp[this.c].page) {
            root = "page";
        }
        /*fichier js de c*/
        var fileC = 'compile/tmp/middle/' + root + '/' + this.comp[this.c].type + '.js';
        /*fichier html de c*/
        var fileHtmlC = 'compile/tmp/middle/' + root + '/' + this.comp[this.c].type + '.html';
        fs.readFile(fileHtmlC, 'utf-8', (err, c_html) => {
            /* rendre l'indexer de iterate unique*/
            c_html = this.replaceSubString2(c_html, this.indexerVar, this.indexVar, this._antiMotClee);
            this.indexVar++;
            fs.writeFile(fileHtmlC, c_html, 'utf8', (err) => {
                fs.readFile(fileC, 'utf-8', (err, c_js) => {
                    /* adapter l'indexer dans le cas d'une page*/
                    if (this.comp[this.c].page) {
                        c_js = this.replaceSubString2(c_js, this.indexer,
                            'attribut.' + this.comp[this.c].type, this._antiMotClee);
                    }
                    fs.writeFile(fileC, c_js, 'utf8', (err) => {
                        this.sc = 0;
                        this.generer[this.c] = true;
                        console.log(this.c + " generer");
                        if (this.c + 1 < this.comp.length) {
                            this.c++;
                        } else { this.c = 0 }

                        if (this.allCompIsGenerated() && this.subStape == this.GENARATE_JS) {
                            this.subStape = this.GENARATE_HTML;
                            this.sc = 0;
                            // mettre a jour generer
                            this.generer = new Array();
                            for (var i = 0; i < this.comp.length; i++) {
                                this.generer.push(false);
                            }
                        }
                        this.composition();
                    })
                })
            })
        })
    }
    /* modifier le js du composant courant en ajoutant son sous composant courant*/
    modifyParentJs() {
        var root = "composant";
        if (this.comp[this.c].page) {
            root = "page";
        }
        /*fichier js de c*/
        var fileC = 'compile/tmp/middle/' + root + '/' + this.comp[this.c].type + '.js';
        /*fichier js de sc*/
        var fileSc = 'compile/tmp/middle/composant/' + this.comp[this.comp[this.c].sub[this.sc]].type + '.js';
        /*fichier html de c*/
        var fileHtmlC = 'compile/tmp/middle/' + root + '/' + this.comp[this.c].type + '.html';
        fs.readFile(fileSc, 'utf-8', (err, sc_js) => {
            fs.readFile(fileHtmlC, 'utf-8', (err, c_html) => {
                fs.readFile(fileC, 'utf-8', (err, c_js) => {
                    var a = c_html.split(this.delComp);
                    var k = 0;// numero du composant effectif
                    // pour chaque composant effectif
                    for (var i = 1; i < a.length; i += 2) {
                        var param = a[i].split(this.vide2);
                        var sc = this.comp[this.c].sub[this.sc];
                        // si il est du type courant alors 
                        if (param[0] == this.comp[sc].type) {
                            var copy = "\n" + sc_js + "";
                            //si c est une page
                            if (this.comp[this.c].page) {
                                copy = this.replaceSubString2(copy, this.indexer,
                                    'attribut.' + this.comp[this.c].type + "._child" + k,
                                    this._antiMotClee);
                            } else {// si un simple composant
                                copy = this.replaceSubString2(copy, this.indexer,
                                    this.indexer + "._child" + k, this._antiMotClee);
                            }
                            // indexer Parent
                            copy = this.replaceSubString2(copy, this.indexerParent,
                                this.indexer, this._antiMotClee);
                            c_js += "\n" + copy;
                            /* pour chaque declaration*/
                            for (var j = 1; j < param.length; j++) {
                                param[j] = this.replaceSubString2(param[j], 'child@',
                                    "_child" + k, this._antiMotClee);
                                var declaration = param[j].split('=');
                                var isExpression = false;
                                //si c est une page
                                if (this.comp[this.c].page) {
                                    var x = 'attribut.' + this.comp[this.c].type;
                                    declaration[0] = x + "." + declaration[0];
                                    isExpression = this.isExpression(declaration[1]);
                                    if (isExpression) {
                                        declaration[1] = this.replaceSubString(declaration[1], '\n', '');
                                        declaration[1] = "eval(" + declaration[1] + ");";
                                    } else {
                                        declaration[1] = x + "." + declaration[1] + ";";
                                    }
                                } else {
                                    declaration[0] = this.indexer + "." + declaration[0];
                                    isExpression = this.isExpression(declaration[1]);
                                    if (isExpression) {
                                        declaration[1] = this.replaceSubString(declaration[1], '\n', '');
                                        declaration[1] = "eval(" + declaration[1] + ");";
                                    } else {
                                        declaration[1] = this.indexer + "." + declaration[1] + ";";
                                    }
                                }
                                var relation = declaration.join('=');
                                if (!isExpression) {
                                    relation = this._delRelation + '\n' + relation + '\n' + this._delRelation;
                                }
                                c_js += "\n" + relation;
                            }
                        }
                        k++;
                    }
                    fs.writeFile(fileC, c_js, 'utf8', (err) => {
                        this.sc++; this.addSub();
                    })

                });
            });
        });
    }
    /**/
    modifyParentHtml() {
        var root = "composant";
        if (this.comp[this.c].page) {
            root = "page";
        }
        /*fichier html de sc*/
        var fileHtmlSc = 'compile/tmp/middle/composant/' + this.comp[this.comp[this.c].sub[this.sc]].type + '.html';
        /*fichier html de c*/
        var fileHtmlC = 'compile/tmp/middle/' + root + '/' + this.comp[this.c].type + '.html';
        fs.readFile(fileHtmlSc, 'utf-8', (err, sc_html) => {
            fs.readFile(fileHtmlC, 'utf-8', (err, c_html) => {
                var a = c_html.split(this.delComp);
                var k = 0;// numero du composant effectif
                // pour chaque composant effectif
                for (var i = 1; i < a.length; i += 2) {
                    var param = a[i].split(this.vide);
                    var sc = this.comp[this.c].sub[this.sc];
                    // si il est du type courant alors 
                    if (param[0] == this.comp[sc].type) {
                        var copy = "" + sc_html;
                        //si c est une page
                        if (this.comp[this.c].page) {
                            copy = this.replaceSubString2(copy, this.indexer,
                                this.comp[this.c].type + "._child" + k, this._antiMotClee);
                        } else {// si un simple composant
                            copy = this.replaceSubString2(copy, this.indexer,
                                this.indexer + "._child" + k, this._antiMotClee);
                        }
                        copy = this.replaceSubString2(copy, "<!--<comp@-->", "", this._antiMotClee);
                        copy = this.replaceSubString2(copy, "<!--@>-->", "", this._antiMotClee);
                        a[i] = copy;
                        a[i] = "<!--<comp@-->" + a[i] + ' <!--@>-->';

                    } else {
                        a[i] = "<comp@" + a[i] + '@>';
                    }
                    k++;
                }
                c_html = a.join('');
                fs.writeFile(fileHtmlC, c_html, 'utf8', (err) => {
                    this.sc++; this.addSub();
                })
            })
        })
    }
    /* remplace sub1 par sub2 dans text*/
    replaceSubString(text, sub1, sub2) {
        var tab = text.split(sub1);
        return tab.join(sub2);
    }
    /* remplace sub1 par sub2 dans text*/
    replaceSubString2(text, sub1, sub2, except) {
        if (except == null) {
            except = '\\';
        }
        var tab = text.split(sub1);
        for (var i = 0; i < tab.length - 1; i++) {
            if (tab[i][tab[i].length - 1] == except) {
                // tab[i]=tab[i].substring(0,tab[i].length-2);
                tab[i] += sub1;
            } else {
                tab[i] += sub2;
            }
        }
        return tab.join('');
    }
    /* remplace sub1 par sub2 dans text en alevant le except*/
    replaceSubString3(text, sub1, except) {
        var tab = text.split(except + sub1);
        return tab.join(sub1);
    }
    // copier les fichier resultant dans z
    copyMiddleToZ(i) {
        if (i < this.comp.length) {
            var root = "composant";
            if (this.comp[i].page) {
                root = "page";
            }
            /*fichier middle*/
            var middle = 'compile/tmp/middle/' + root + '/' + this.comp[i].type;
            /*fichier  z du js*/
            var z = 'z/script/' + this.comp[i].type;
            /*fichier  z du css*/
            var zCss = 'z/css/' + this.comp[i].type;
            /*fichier  original du css*/
            var css = root + '/' + this.comp[i].path + '/' + this.comp[i].type;
            fs.copyFile(css + ".css", zCss + ".css", (err) => {
                // si c'est une page on importe aussi son js
                if (this.comp[i].page) {
                    fs.readFile(middle + '.js', 'utf-8', (err, c_js) => {
                        c_js = this.removeAntiMotClee(c_js);
                        fs.writeFile(z + ".js", c_js, 'utf8', (err) => {
                            this.copyMiddleToZ(i + 1);
                        })
                    })
                    // fs.copyFile(middle + ".js", z + ".js", (err) => {
                    //     this.copyMiddleToZ(i + 1);
                    // })
                } else {
                    this.copyMiddleToZ(i + 1);
                }
            })
        } else {
            console.log("copyMiddle")
            /* prendre les relation entre composants et pages*/
            this.removeAntiMotCleeFromHtml(0);
        }
    }
    removeAntiMotCleeFromHtml(i){
        if(i<this.comp.length){
            if(this.comp[i].page){
                var file="compile/tmp/middle/page/"+this.comp[i].type+".html";
                fs.readFile(file,"utf-8",(err,html)=>{
                    html=this.removeAntiMotClee(html);
                    fs.writeFile(file,html,'utf-8',(err)=>{
                        this.removeAntiMotCleeFromHtml(i+1);
                    })
                })
            }else{
                this.removeAntiMotCleeFromHtml(i+1);
            }
        }else{
            console.log("removeAntiMotCleeFromHtml")
            /* prendre les relation entre composants et pages*/
            this.takeRelation(0);
        }
    }
    /* prendre les relation entre composants et pages*/
    takeRelation(i) {
        console.log("takerelation"+i)
        if (i < this.comp.length) {
            if (this.comp[i].page) {
                /*fichier js de c*/
                var fileC = 'z/script/' + this.comp[i].type + '.js';
                fs.readFile(fileC, 'utf-8', (err, c_js) => {
                    var tab = c_js.split(this._delRelation);
                    for (var j = 1; j < tab.length; j += 2) {
                        this._relation += tab[j];
                        tab[j] = "";
                    }
                    c_js = tab.join('');
                    fs.writeFile(fileC, c_js, 'utf8', (err) => {
                        this.takeRelation(i + 1);
                    })
                })
            } else {
                this.takeRelation(i + 1)
            }
        } else {
            console.log("takerelation")
            /* cree la methode qui rappel les relations*/
            this.createFunctionForUpdateRelation()
        }
    }
    /* cree la methode qui rappel les relations*/
    createFunctionForUpdateRelation() {
        /*fichier js de c*/
        var file = 'z/script/core/relationComp.js';
        var methode = "App._relationComp=function()\n{\n" + this._relation + "\n}";
        fs.writeFile(file, methode, 'utf8', (err) => {
            compile.generate();
        })

    }
    /* retourne si val est une expression*/
    isExpression(val) {
        var reg = /^'(.)*(\n)*(.)*'$|^".*"$/;
        return val.match(reg) != null;
    }
    /* */
    removeAntiMotClee(text) {
        var val = this.replaceSubString3(text, this.indexer, this._antiMotClee);
        val = this.replaceSubString3(val, this.indexerVar, this._antiMotClee);
        return val;
    }
}
module.exports = new Composition();