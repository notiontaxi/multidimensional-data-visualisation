/*
FileReader class

*/


window.FileProcessor = FileProcessor; 
"use strict";


  function FileProcessor(){
    this.reader = this.getFileReader();
  }

  FileProcessor.prototype.processFile = function(event){
    event.stopPropagation();
    event.preventDefault();

    var files = event.dataTransfer.files;
    
    this.reader.readAsText(files[0]);
    console.log();
  }

  FileProcessor.prototype.checkFileReaderSupport = function(){
    return window.File && window.FileList && window.FileReader;
  }


  FileProcessor.prototype.parseFile = function(content){
    this.createCarDatas(this.textToArray(content));
  }

  FileProcessor.prototype.createCarDatas = function(values){
    var carDatas = Array();

    for(var i = 1; i < values.length; i++)
      carDatas.push(new window.CarData(values[i]));
      
    console.log(carDatas[0].getDataObject());
  }

  FileProcessor.prototype.textToArray = function(text){

    var lines = text.replace(/\r\n/g, "\n").split("\n");
    if(this.checkContent(lines[0])){
      var result = Array();

      for(var i = 0; i < lines.length; i++)
        result.push(lines[i].split('\t'));

      return result;
    }
    else
      return undefined;

  }

  FileProcessor.prototype.checkContent = function(checkMe){
    var cleaned = checkMe.replace(/\t/g, '');
    return cleaned == "CarManufacturerMPGCylindersDisplacementHorsepowerWeightAccelerationModel YearOrigin";
  }

 
  FileProcessor.prototype.getFileReader = function(){
    if (!this.reader)
    {
      if(this.checkFileReaderSupport()){
        this.reader = new FileReader();

        this.reader.addEventListener("load", function(event) {
        });  
        
        this.reader.addEventListener("loadend", function(event) {
          this.parseFile(event.target.result);
        }.bind(this)); 


        return this.reader;
      }
      else
        alert("Your browser does not support File API");
        return undefined;
    }
    return this.reader;
  }





