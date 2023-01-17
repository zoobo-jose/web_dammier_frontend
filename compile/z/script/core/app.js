/*
 <img class="var@ img"/>
<input class="var@ img"/>
<span class="var@ img"></span>
 <div class="iterate@ e in@ test " id="test">
        bonjour {{e@index}}
        <img class="var@ @@e.img@@ img"/>
        <!-- <input class="var@ @@e.a@@" onclick="alert('@e@')"/> -->
 </div>
*/
var App = {
    init: function () {
        document.title = attribut.appName;
        App.compileComposant();
        attribut[attribut._current].init();
        App.refresh();
    },
    refresh: function () {
        App.compileIterate();
        App.udpateView();
        App.compileIf();
        App.putReaction();
    },
    // refreshForElement: function (nameClass) {
    //     App.compileIterate();
    //     App.udpateViewForAnElement(nameClass);
    //     App.compileIf();
    //     App.putReaction();
    // },
    putReaction: function () {
        /* a jour automatique*/
        items = document.getElementsByClassName('var@');
        for (var j = 0; j < items.length; j++) {

            items[j].addEventListener("change", function () {
                var classe = this.classList[1];
                if (this.value != null) {
                    App.setAttribut(classe, this.value);
                } else {
                    App.setAttribut(classe, this.innerHTML);
                }
            })
        }
    },
    setAttribut: function (nameClass, val) {
        var chaine = nameClass.split('.');
        if (chaine.length > 0) {
            var x = attribut;
            for (var i = 0; i < chaine.length - 1; i++) {
                var attr = chaine[i];
                if (App.isNumber(attr)) {
                    attr = parseInt(attr, 10);
                }
                x = x[attr];
                if (x == null) {
                    return false;
                }
            }
            var attr = chaine[chaine.length - 1];
            if (App.isNumber(attr)) {
                attr = parseInt(attr, 10);
            }
            x[attr] = val;
            App.udpateViewForAnElement(nameClass);
            return true;
        }
    },
    getAttribut: function (nameClass) {
        var chaine = nameClass.split('.');
        if (chaine.length > 0) {
            var x = attribut;
            for (var i = 0; i < chaine.length - 1; i++) {
                var attr = chaine[i];
                if (App.isNumber(attr)) {
                    attr = parseInt(attr, 10);
                }
                x = x[attr];
                if (x == null) {
                    return null;
                }
            }
            var attr = chaine[chaine.length - 1];
            if (App.isNumber(attr)) {
                attr = parseInt(attr, 10);
            }
            return x[attr];
        }
        return null;
    },
    getJsVersion: function (nameClass) {
        var chaine = nameClass.split('.');
        if (chaine.length > 0) {
            for (var i = 0; i < chaine.length; i++) {
                var attr = chaine[i];
                if (App.isNumber(attr)) {
                    chaine[i] = "[" + attr + "]";
                }
                if (i < chaine.length - 1 && !App.isNumber(chaine[i + 1])) {
                    chaine[i] = chaine[i] + "."
                }
            }
            return chaine.join("");
        } else {
            return nameClass;
        }
    },
    udpateView() {
        App._relationComp();
        /* a jour automatique*/
        items = document.getElementsByClassName('var@');
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var classe = item.classList[1];
            var val = App.getAttribut(classe);
            if (item.nodeName == "IMG") {
                item.src = val;
            } else {
                if (item.innerHTML != null) {
                    item.innerHTML = val;
                }
                item.value = val;
            }
        }
    },
    udpateViewForAnElement(nameClass) {
        App._relationComp();
        /* a jour automatique*/
        items = document.getElementsByClassName('var@');
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var classe = item.classList[1];
            if (classe == nameClass) {
                var val = App.getAttribut(classe);
                if (item.nodeName == "IMG") {
                    item.src = val;
                } else {
                    if (item.innerHTML != null) {
                        item.innerHTML = val;
                    }
                    item.value = val;
                }
            }
        }
    },
    /*retourne si une chaine de caractere est un nombre*/
    isNumber: function (val) {
        var reg = /^\d+$/;
        return val.match(reg) != null;
    },
    /* supprimer les elements creer par iterate@ */
    removeBeforeIterate: function () {
        var list = document.getElementsByClassName("afterIterate@");
        while (list.length > 0) {
            list[0].remove();
        }
    },
    /* iterate@ e in@ var */
    compileIterate: function () {
        App.removeBeforeIterate();
        var items = document.getElementsByClassName("iterate@");
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var nomVar = item.classList[3];
            var nomEle = item.classList[1];
            item.classList.remove("app___hidden");
            var x = App.getAttribut(nomVar);
            if (x != null) {
                var clone = item;
                for (var j = 0; j < x.length; j++) {
                    var newClone = item.cloneNode(true);
                    newClone.classList.toggle("afterIterate@");
                    newClone.classList.toggle("iterate@");
                    App.compileElementIterate(newClone, nomVar, nomEle, j);
                    clone.insertAdjacentElement("afterend", newClone);
                    clone = newClone;
                }
            }
            item.classList.add("app___hidden");
        }
    },
    compileElementIterate: function (item, nomVar, nomEle, i) {
        var contenu = item.innerHTML;
        var re = /{{|}}/;
        var tab = contenu.split(re);
        for (var j = 1; j < tab.length; j += 2) {
            if (this.equal(nomEle,tab[j])) {
                if (tab[j] == nomEle + "@index") {
                    tab[j] = i;
                } else {
                    var val = tab[j].split('.');
                    val[0] = nomVar + "." + i;
                    if (val.length > 1) {
                        tab[j] = val.join(".");
                    } else {
                        tab[j] = val[0];
                    }
                    tab[j] = '<span class="var@ ' + tab[j] + '"></span>';
                }
            } else {
                tab[j] = '{{' + tab[j] + '}}';
            }
        }
        /*les fonctions */
        contenu = tab.join("");
        re = /'@|@'/;
        tab = contenu.split(re);
        for (var j = 1; j < tab.length; j += 2) {
            if (this.equal(nomEle,tab[j])) {
                if (tab[j] == nomEle + "@index") {
                    tab[j] = i;
                } else {
                    var val = tab[j].split('.');
                    val[0] = 'attribut.' + App.getJsVersion(nomVar) + "[" + i + "]";
                    if (val.length > 1) {
                        tab[j] = val.join(".");
                    } else {
                        tab[j] = val[0];
                    }
                }
            } else {
                tab[j] = '\'@' + tab[j] + '@\'';
            }
        }
        /*les class css */
        contenu = tab.join("");
        re = /@@/;
        tab = contenu.split(re);
        for (var j = 1; j < tab.length; j += 2) {
            if (this.equal(nomEle,tab[j])) {
                if (tab[j] == nomEle + "@index") {
                    tab[j] = i;
                } else {
                    var val = tab[j].split('.');
                    val[0] = nomVar + "." + i;
                    if (val.length > 1) {
                        tab[j] = val.join(".");
                    } else {
                        tab[j] = val[0];
                    }
                }
            } else {
                tab[j] = '@@' + tab[j] + '@@';
            }
        }
        /*avoir la valeur pur*/
        contenu = tab.join("");
        re = /@_|_@/;
        tab = contenu.split(re);
        for (var j = 1; j < tab.length; j += 2) {
            if (this.equal(nomEle,tab[j])) {
                if (tab[j] == nomEle + "@index") {
                    tab[j] = i;
                } else {
                    var val = tab[j].split('.');
                    val[0] = nomVar + "." + i;
                    if (val.length > 1) {
                        tab[j] = val.join(".");
                    } else {
                        tab[j] = val[0];
                    }
                    tab[j] = App.getAttribut(tab[j]);
                }
            } else {
                tab[j] = '@_' + tab[j] + '_@';
            }
        }
        item.innerHTML = tab.join("");
    },
    /* compile les composant en cachant ceux qui ne sont pas courant*/
    compileComposant() {
        var comps = document.getElementsByClassName("comp@");
        for (var i = 0; i < comps.length; i++) {
            var name = comps[i].classList[1];
            if (name != attribut._current) {
                comps[i].classList.add("app___hidden");
            }
        }
    },
    compileIf() {
        var comps = document.getElementsByClassName("if@");
        for (var i = 0; i < comps.length; i++) {
            var name = comps[i].classList[1];
            var val = this.getAttribut(name);
            if (val === true) {
                comps[i].classList.remove("app___hidden");
            } else {
                comps[i].classList.add("app___hidden");
            }
        }
    },
    /* afficher un autre composant*/
    navigate(comp,param) {
        var comps = document.getElementsByClassName("comp@");
        var c = 0;
        for (var i = 0; i < comps.length; i++) {
            var name = comps[i].classList[1];
            if (name == attribut._current) {
                comps[i].classList.add("app___hidden");
                c++;
                if (c == 2) {
                    break;
                }
            }
            if (name == comp) {
                comps[i].classList.remove("app___hidden");
                c++;
                if (c == 2) {
                    break;
                }
            }
        }
        attribut._current = comp;
        attribut[comp].init(param);
        App.refresh();
    },
    equal:function(val1,val2){
        var reg= new RegExp("^\\s*"+val1+"(\.[a-zA-Z_0-9]+)*\\s*$");
        return reg.test(val2);
    }
};
/* permet d'aller d'une page a une autre */
function navigate(url) {
    window.location.href = url;
}