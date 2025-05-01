#!/usr/bin/env node
let fs = require('fs');
let path = require('path');
const { tree } = require('./commands/tree.js');
const { organise } = require('./commands/organise.js');
const { help } = require('./commands/help.js');

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