const fs = require('fs');
class ManageFolder {
    /* creer un dossier de facon reccurente*/
    createFolder(path,callBack) {
        this._createFolder(path.split("/"),callBack,0,"");
    }
    /* aide createFolder */
    _createFolder(tabPath, callBack, i, root) {
        if (i < tabPath.length) {
            if(root.length==0){
                root += tabPath[i];
            }else{
                root += '/' + tabPath[i];
            }
            fs.mkdir(root, (err) => {
                this._createFolder(tabPath,callBack,i + 1,root);
            });
        } else {
            if(callBack!=null){
                callBack();
            }
        }
    }
    /* retourne si un dossier est vide*/
    folderIsEmpty(folder,callBackIsEmpty,callBackIsNotEmpty){
        fs.readdir(folder, (err, files) => {
            if(files==null){
                if(callBackIsEmpty!=null){
                    callBackIsEmpty();
                }
            }else
            if(files.length==0){
                if(callBackIsEmpty!=null){
                    callBackIsEmpty();
                }
            }else{
                if(callBackIsNotEmpty!=null){
                    callBackIsNotEmpty();
                }
            }
        })
    }
    /* supprime recurssivement des dossiers si ceux si ne contiennent rien sauf
       la racine 
    */
    deleteEmptyFolder(folder,callBack){
        var tabFolder=folder.split('/');
        this._deleteEmptyFolder(tabFolder,callBack,tabFolder.length);
    }
    /* aide deleteEmptyFolder*/
    _deleteEmptyFolder(tabFolder,callBack,n){
        if(n>1&&n<=tabFolder.length){
            var root=tabFolder[0];
            for(var i=1;i<n;i++){
                root+="/"+tabFolder[i];
            }
            this.folderIsEmpty(root,
                ()=>{// si le dossier est vide
                    fs.rm(root, { recursive: true },(err)=>{
                        this._deleteEmptyFolder(tabFolder,callBack,n-1);
                    })
                },
                ()=>{
                    // si il n'est pas vide
                    callBack();
                })
        }else{
            callBack();
        }
    }
}
module.exports = new ManageFolder();
