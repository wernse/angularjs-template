var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var config = require('../config');
var admZip = require('adm-zip');
var csv = require('csv');
var stream = require('stream');
var Converter = require("csvtojson").Converter;
var async = require('async');


module.exports = {
    upload: upload,
}

function upload(req, res) {
    try {
        console.log(req);
        console.log(res);
        // create an incoming form object
        var form = new formidable.IncomingForm();
        // store all uploads in the /uploads directory
        form.uploadDir = config.uploadsFolder;

        var dataMap = {};
        var colMap = [];
        var outerCounter = 0;
        form.on('fileBegin', function(name, file) {
            console.log(name);
            console.log(file);
        });
        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        var outerFileLocation = "";
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            outerFileLocation = path.join(form.uploadDir, file.name);
        });

        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            var zip = new admZip(outerFileLocation);
            var zipEntries = zip.getEntries(); // an array of ZipEntry records
            zipEntries.forEach(function(table) {
                    var stringData = table.getData().toString('utf8');
                    var converter = new Converter({
                        delimiter: [",", ";"]
                    });
                    converter.fromString(stringData, parseCsvCallback(table.name));
                })
                //create db map - tables, is a folder
                //read each as csv and pipe object into a return obj
            zip.extractAllTo(path.join(form.uploadDir, "/zip/"), true);

            //closure for async returns to know what table it belonds to
            function parseCsvCallback(table) {
                function parsedCallback(err, result) {
                    var tableMap = getColumnNames(table, result[0]);
                    colMap.push(tableMap);

                    var sampleRows = result.slice(0, 30);
                    dataMap[table] = sampleRows;
                    outerCounter++;
                    if (outerCounter == zipEntries.length) {
                        res.send({
                            "colMap": colMap,
                            "dataMap": dataMap
                        });
                    }
                }
                return parsedCallback;
            }
        });
        // parse the incoming request containing the form data
        form.parse(req);
    } catch (error) {
        console.log(error);
    }
}

function getColumnNames(tableName, row) {
    var cols = Object.keys(row);
    var colObject = {
        "name": tableName,
        "columns": cols
    }
    return colObject;
}



process.on('uncaughtException', function(err) {
    console.log("Uncaught exception!", err);
});

// var data = new Buffer(zipEntries[0].getData());

// var bufferStream = new stream.PassThrough();
// bufferStream.end(data);
// bufferStream.pipe(converter);
// converter.on("end_parsed", function(jsonArray) {
//     console.log(jsonArray); //here is your result jsonarray
//     res.send(jsonArray);
// });

// converter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
//     if (rowIndex > 30)
//         return;
// });