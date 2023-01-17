/* 
    service test
*/
var testService = {
    test() {
        return fetch("http:localhost/projet1/index.php").then(v => v.json())
            .then((j) => {
                return new Promise((resolve,reject)=>{
                    console.log(j);
                    resolve(j);
                });
            })
            .catch((err) => {
                console.log(err);
                return new Promise((resolve,reject)=>{
                    resolve(null);
                });
            });
    }
}