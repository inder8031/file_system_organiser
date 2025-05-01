const fs = require('fs');
const path = require('path');

function tree(dirPath) {
    // console.log("Tree command implemented");
    if(dirPath == undefined) {
        treeHelper(process.cwd(), "");
        return;
    }

    let doesExist = fs.existsSync(dirPath);
    if(!doesExist) {
        console.log("Error: Invalid ❌ Path");
        return;
    }

    let indent = "";
    treeHelper(dirPath, indent);
}

function treeHelper(dirPath, indent) {
    let stats = fs.lstatSync(dirPath);

    if(stats.isFile()) {
        let fileName = path.basename(dirPath);
        console.log(indent + "|——" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "￣▽——" + dirName);
        let children = fs.readdirSync(dirPath);
        for(let child of children) {
            let childPath = path.join(dirPath, child);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    tree
}