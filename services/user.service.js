/* 
    service user
*/
var userService={
    isconnected:false,/* indique si l'utilisateur est connecte */
    connect(tel,password){
        return new Promise((resolve,reject)=>{
            userService.isconnected=true;
            setTimeout(()=>{
                resolve("connected");
            },1000);
        })
    }
}