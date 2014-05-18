angular.module('gsnClientApp')
  .service("TableService", function (FilterService) {
    
    var tableData = [];
    FilterService.setSensorName("temprabbit");

    FilterService.getAllDataBySensorName(function (data) {
      tableData = data;
    });

  this.GenerateTable = function() {
    var field = {};
    var body = document.getElementById("table");
   
    // creates a <table> element and a <tbody> element
    var tbl     = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");

    //field = data[0];
    for (var key in tableData[0]) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(key);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBody.appendChild(row);
    }
    
    // creating all cells
    for (var j = 0; j < tableData.length; j++) {
      // creates a table row
      row = document.createElement("tr");
      field = tableData[j];
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
  }
});