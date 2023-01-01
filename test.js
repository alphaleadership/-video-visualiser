
const path=require("path"),FileDatabase=require("./db.js")
const directoryPath = "C:\\Users\\MPA\\Videos\\file"

const fs = require('fs');
const uuid = require("uuid")

let input = "This is a [test] string.";
let regex = /\[(.*?)\]/;
let matches = input.match(regex);

// matches[0] contiendra "[test]"
// matches[1] contiendra "test"

let fdb = new FileDatabase(directoryPath)
fdb.readDatabase()
fdb.savedb()
//console.log(fdb)
//console.log(fdb.database.length)
//console.log(matches)