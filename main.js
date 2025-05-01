let fs = require('fs');
let path = require('path');
let types = require('./utility.js').types;

let inputArr = process.argv.slice(2);
// console.log(inputArr);

// node main.js tree "directoryPath"
// node main.js organise "directoryPath"
// node main.js help

let command = inputArr[0];
switch(command) {
    case 'tree':
        tree(inputArr[1]);
        break;
    case 'organise':
        organise(inputArr[1]);
        break;
    case 'help':
        help();
        break;
    default: 
        console.log("Invalid ❌ command");
}

function tree(dirPath) {
    // console.log("Tree command implemented");
    if(dirPath == undefined) {
        console.log("Error: Path not provided");
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

function organise(dirPath) {
    // console.log("Organise command implemented");
    if(dirPath == undefined) {
        console.log("Error: Path not provided");
        return;
    }

    let doesExistPath = fs.existsSync(dirPath);
    if(doesExistPath === false) {
        console.log("Error: Invalid path");
        return;
    }
    
    let destFolderAddr = path.join(dirPath, 'organised');
    if(fs.existsSync(destFolderAddr) === false) {
        fs.mkdirSync(destFolderAddr);
        console.log('folder created');
    }

    let filesAndFolders = fs.readdirSync(dirPath);
    // console.log(filesAndFolders);
    for(let fileOrFolder of filesAndFolders) {
        let stats = fs.lstatSync(path.join(dirPath, fileOrFolder));
        if(stats.isFile()) {
            // console.log(fileOrFolder);
            let ext = path.extname(fileOrFolder).slice(1);
            // console.log(fileOrFolder , " extends to ", ext);
            let type = findSuitableFolder(ext);
            let finalDstnPath = path.join(dirPath, 'organised', type); 
            if(!fs.existsSync(finalDstnPath)) {
                fs.mkdirSync(finalDstnPath);
            }

            fs.copyFileSync(path.join(dirPath, fileOrFolder), path.join(finalDstnPath, fileOrFolder));
            console.log(fileOrFolder, " copied to ", type);
            fs.unlinkSync(path.join(dirPath, fileOrFolder));
            console.log(fileOrFolder, " deleted");
        }
    }

}

function help() {
    console.log(`
        node main.js tree "directoryPath"
        node main.js organise "directoryPath"
        node main.js help
        `);
}

function findSuitableFolder(ext) {
    for(let type in types) {
        for(let extension of types[type]) {
            if(extension === ext) {
                return type;
            }
        }
    }

    return 'others';
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