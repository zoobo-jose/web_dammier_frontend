const fs = require('fs');
// flex_direction_wrap_justifiContent_alignItems
let directions = [
    { name: 'row', symbol: 'r' },
    { name: 'row-reverse', symbol: 'rr' },
    { name: 'column', symbol: 'c' },
    { name: 'column-reverse', symbol: 'cr' },
]
let wraps = [
    { name: 'wrap', symbol: 'w' },
    { name: 'nowrap', symbol: 'nw' },
]
let justifys = [
    { name: 'center', symbol: 'c' },
    { name: 'space-between', symbol: 'sb' },
    { name: 'space-around', symbol: 'sa' },
    { name: 'stretch', symbol: 's' },
    { name: 'flex-end', symbol: 'end' },
    { name: 'flex-start', symbol: 'start' },
]
function create() {
    let text = '';
    let num = 0;
    for (var i = 0; i < directions.length; i++) {
        let direction = directions[i];
        for (var j = 0; j < wraps.length; j++) {
            let wrap = wraps[j];
            for (var k = 0; k < justifys.length; k++) {
                let justify = justifys[k];
                for (var n = 0; n < justifys.length; n++) {
                    num++;
                    let align = justifys[n];
                    let classe = '.flex_' + direction.symbol + '_' + wrap.symbol +
                        '_' + justify.symbol + '_' + align.symbol;
                    let content = '\tdisplay:flex;\n' +
                        '\tflex-direction:' + direction.name + ';\n' +
                        '\tflex-wrap:' + wrap.name + ';\n' +
                        '\tjustify-content:' + justify.name + ';\n' +
                        '\talign-items:' + align.name + ';\n'
                    text += '/*' + num + '*/\n' + classe + '{\n' + content + '}\n';
                }
            }
        }
    }
    return text;
}
let breaks = [];
for (var i = 1; i <= 12; i++) {
    breaks.push(i * 100);
}
let dims = [];
for (var i = 1; i <=21; i++) {
    dims.push(i);
}
function createDim() {
    let text = '';
    let head='';
    let num = 0;
    let coef=100/21;
    for (var i = 0; i < breaks.length; i++) {
        let br = breaks[i];
        for (var j = 0; j < dims.length; j++) {
            let dim = dims[j];
            num++;
            let classe = '.dim_' +br+ '_' +dim;
            let content = '\twidth:'+(coef*dim)+'%;\n'+
                        'transition:0.2s' +';\n';
            content= '/*' + num + '*/\n' + classe + '{\n' + content + '}\n';
            text+='@media screen and (min-width:'+br+'px) {\n'+content+'}\n';
            //le head
            if(head.length!=0){
                head+=','+classe;
            }else{
                head=classe;
            }
        }
    }
    head+='{width:100%;}\n';
    return head+text;
}
fs.writeFile('dim.css',createDim(),'utf-8',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('terminee');
    }
})
// console.log(createDim());