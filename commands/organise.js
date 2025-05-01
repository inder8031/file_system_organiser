const fs = require('fs');
const path = require('path');
let types = require('../utility.js').types;

function organise(dirPath) {
    // console.log("Organise command implemented");
    if(dirPath == undefined) {
        dirPath = process.cwd();
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

module.exports = {
    organise
}