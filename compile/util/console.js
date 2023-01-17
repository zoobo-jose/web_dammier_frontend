/*
    permet de recuperer les variables depuis la console
    console{
        -params{
            liste des parametre a recuperer
            - param={
                - name { nom du parametre}
                - val { valeur du paramtre}
                - type { type de la valeur}
            }
        }
        -INTEGER { valeur de possible de param.type pour dire qu'il s'agit d'un entier}
        -FLOAT { valeur de possible de param.type pour dire qu'il s'agit d'un nombre}
        -STRING { valeur de possible de param.type pour dire qu'il s'agit d'un string}
    }
*/
const readline = require('readline');
var rl;
class Console {
    params = new Array();
    /* valeur possible des type de param*/
    INTEGER = 0;
    FLOAT = 1;
    STRING = 2;
    /*
         creer une nouveau parametre
         type peut prendre la valeur 
    */
    newParams(name, val, type) {
        return {
            name: name,
            val: val,
            type: type
        }
    }
    /*
        -takeParams(callBack,i){
            -methode pour recuperer les parametres
            callBack est la methode a appeler apres prise des paramettres
            -algo: 
                - si i<params.taille alors
                        p= params[i]
                        prendre la valeur de p en gardant son encienne valeur si la nouvelles est vide
                        takeParams(callBack,i+1)
                - sinon
                     afficher les valeurs et 
                    damander si les valeurs sont bonnes
                    -si oui alors
                        callBack(params)
                    -sinon
                        takeParams(callBack,0)
                    -finsi
                -finsi

            -fin
        }
    */
    takeParams(callBack){
        this._takeParams(callBack,0);
    }
    _takeParams(callBack, i) {
        if (i == 0) {
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })
        }
        if (i < this.params.length) {
            var p = this.params[i];
            rl.question("Entrer " + p.name + " : ", (val) => {
                if (val.length > 0) {
                    if (p.type == this.STRING) {
                        this.params[i].val = val;
                    } else
                        if (p.type == this.INTEGER) {
                            this.params[i].val = parseInt(val);
                        } else
                            if (p.type == this.FLOAT) {
                                this.params[i].val = parseFloat(val);
                            }
                }
                this._takeParams(callBack, i + 1);
            })
        } else {
            console.log("\n------- valeurs prises :\n");
            for (var j = 0; j < this.params.length; j++) {
                var p = this.params[j];
                console.log("   "+p.name + " = " + p.val);
            }
            rl.question("\nles valeurs sont correct (y/n)?: ", (val) => {
                rl.close();
                if (val == 'y') {
                    callBack(this.params);
                } else {
                    this._takeParams(callBack, 0);
                }
            })
        }
    }
    /*
        -takeParams2(callBack){
            - une variante de takeParams methode pour recuperer les parametres
            callBack est la methode a appeler apres prise des paramettres
           -algo: 
                - si i<params.taille alors
                        p= params[i]
                        prendre la valeur de p en gardant son encienne valeur si la nouvelles est vide
                        demander si elle est bonne
                        -si oui
                            takeParams2(callBack,i+1)
                        -sinon
                             takeParams2(callBack,i)
                        -finsi
                - sinon
                    callBack(params)
                -finsi

            -fin
        }
    */
    takeParams2(callBack, i) {
        if (i == 0) {
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })
        }
        if (i < this.params.length) {
            var p = this.params[i];
            rl.question("Entrer " + p.name + " : ", (val) => {
                if (val.length > 0) {
                    if (p.type == this.STRING) {
                        this.params[i].val = val;
                    } else
                        if (p.type == this.INTEGER) {
                            this.params[i].val = parseInt(val);
                        } else
                            if (p.type == this.FLOAT) {
                                this.params[i].val = parseFloat(val);
                            }
                }
                console.log(p.name+" = "+p.val);
                rl.question("la valeurs de " + p.name+" est correct (y/n)?: ", (val) => {
                    if (val == 'y') {
                        this.takeParams2(callBack, i + 1);
                    } else {
                        this.takeParams2(callBack, i);
                    }
                })
            })
        } else {
            rl.close();
            callBack(this.params);
        }
    }

}
var c = new Console();
// c.params.push(c.newParams('param 1', "val 1", c.FLOAT));
// c.params.push(c.newParams('param 2', "val 2", c.INTEGER));
// c.params.push(c.newParams('param 3', "val 3", c.STRING));
// c.takeParams((params) => {
//     console.log(params)
// }, 0);
module.exports = new Console();