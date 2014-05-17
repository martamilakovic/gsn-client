'use strict';

angular.module('gsnClientApp')
  .controller("Table", function ($scope, FilterService) {
       
    FilterService.setSensorName("temprabbit");

    $scope.generate_table = function() {
      // get the reference for the body
      var body = document.getElementById("table");
     
      // creates a <table> element and a <tbody> element
      var tbl     = document.createElement("table");
      var tblBody = document.createElement("tbody");

      // creating all cells
      for (var i = 0; i < 2; i++) {
        // creates a table row
        var row = document.createElement("tr");
     
        for (var j = 0; j < 2; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          var cellText = document.createTextNode("cell in row "+i+", column "+j);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
     
        // add the row to the end of the table body
        tblBody.appendChild(row);
      }
     
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      body.appendChild(tbl);
      // sets the border attribute of tbl to 2;
      tbl.setAttribute("border", "2");
    }

   FilterService.getAllDataBySensorName(function (data) {
    var field = {};
    var body = document.getElementById("table");
   
    // creates a <table> element and a <tbody> element
    var tbl     = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");

    field = data[0];
    for (var key in field) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(key);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBody.appendChild(row);
    }

    // creating all cells
    for (var j = 0; j < data.length; j++) {
      // creates a table row
      row = document.createElement("tr");
      field = data[j];
      var i = 0;

      for (var key in field) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(field[key]);
        cell.appendChild(cellText);
        row.appendChild(cell);
        i++;
      }
   
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  });
});