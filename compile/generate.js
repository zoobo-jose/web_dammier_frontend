const c = new require('./core/composition');
const fs= require('fs');
fs.readFile('compile/tmp/page.txt', 'utf8', (err, data) => {
    if(data.length>0){
        c.updateMiddle(0);
    }else{
        console.log("\n:( <---? generation bloquer ....")
        console.log("\n:o >---! creez au moins une page pour pouvoir generer  avec la commande:\n\t'node compile/createPage'  ...\n");
    }
})
