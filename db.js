let uuid =require("uuid").v4
const fs =require("fs")
let array=fs.readdirSync("C:\\Users\\MPA\\Videos\\file")
init=()=>{
    let result=[]
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        result.push({path:element,id:uuid(15)})
    }
    return result
}
class db{
    constructor(){
        this.db=init()
    }
    getpath=(id)=>{
        let content =this.db
        let i=0
        let path=""
        while(content[i].id!==id){
            i+=1
        }return path="C:\\Users\\MPA\\Videos\\file"+content[i].path
    }
    get=(id)=>{
        let content =this.db
        let i=0
        let path=""
        while(content[i].id!==id){
            i+=1
        }return content[i].id
    
    }
}
module.exports=db