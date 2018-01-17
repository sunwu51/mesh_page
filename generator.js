var fs = require('fs')
if(!fsExists(process.argv[2])){
    console.error(process.argv[2],"file not exist")
    process.exit(1);
}

var conf = JSON.parse(fs.readFileSync(process.argv[2]).toString());
var pagePath = "./src/pages/"+conf.name+"/index.js";
var reduPath = "./src/pages/"+conf.name+"/reducer.js";
var menuPath ="./src/pages/menus.js";
conf.url.get.path=short(conf.url.get.path);
conf.url.add.path=short(conf.url.add.path);
conf.url.delete.path=short(conf.url.delete.path);
conf.url.update.path=short(conf.url.update.path);


if(fsExists("./src/pages/"+conf.name)){
    console.error(conf.name+" already exists")
    process.exit(1);
}
fs.mkdirSync("./src/pages/"+conf.name);

fs.writeFileSync(pagePath,fs.readFileSync('./template/page.js').toString()
    .replace(/\$name\$/mg,conf.name)
    .replace(/\$columns\$/mg,JSON.stringify(conf.columns)));
    console.log("add file "+pagePath)
    
fs.writeFileSync(reduPath,fs.readFileSync('./template/reducer.js').toString()
    .replace(/\$name\$/mg,conf.name)
    .replace(/\$id\$/mg,conf.url.id)
    .replace(/\$baseUrl\$/g,conf.url.baseUrl)
    .replace(/\$get\.path\$/g,conf.url.get.path)
    .replace(/\$add\.path\$/g,conf.url.add.path)
    .replace(/\$delete\.path\$/g,conf.url.delete.path)
    .replace(/\$update\.path\$/g,conf.url.update.path))
    ;
    console.log("add file "+reduPath)
fs.writeFileSync(menuPath,
    fs.readFileSync(menuPath).toString()
        .replace(/\/\*anchor\*\//g,"{ name:'"+conf.name+"',key: '/app/"+conf.name+"', title: '"+conf.name+"', icon: 'rocket', },\n\t/*anchor*/"));
console.log("update file "+menuPath)

console.log('finish')

function fsExists(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
function short(path){
    if(path.startsWith("/"))
        return path.substring(1)
    else
        return path;
}
