'use strict';

angular.module('gsnClientApp')
  .controller("ElectrictyMeterChart", function ($scope,FilterData) {
    
    var chart;
    var chartData = [];
    var vSkillText = "";

    FilterData.setSensorName("rabbitbrojilo");

    function GenetareChart() {
      // first we generate some random data
      // generateChartData();

      // SERIAL CHART
      chart = new AmCharts.AmSerialChart();
      chart.pathToImages = "bower_components/chart/amcharts/images/";
      chart.dataProvider = chartData;
      chart.categoryField = "date";

      // data updated event will be fired when chart is first displayed,
      // also when data will be updated. We'll use it to set some
      // initial zoom
      chart.addListener("dataUpdated", zoomChart);

      // AXES
      // Category
      var categoryAxis = chart.categoryAxis;
      categoryAxis.parseDates = true; // in order char to understand dates, we should set parseDates to true
      categoryAxis.minPeriod = "mm"; // as we have data with minute interval, we have to set "mm" here.      
      categoryAxis.gridAlpha = 0.07;
      categoryAxis.axisColor = "#DADADA";

      // Value
      var valueAxis = new AmCharts.ValueAxis();
      valueAxis.gridAlpha = 0.07;
      valueAxis.title = "Consumption";
      chart.addValueAxis(valueAxis);

      // GRAPH
      var graph = new AmCharts.AmGraph();
      graph.type = "line"; // try to change it to "column"
      graph.title = "red line";
      graph.valueField = "consumption";
      graph.lineAlpha = 1;
      graph.lineColor = "#d1cf2a";
      graph.fillAlphas = 0.3; // setting fillAlphas to > 0 value makes it area graph
      chart.addGraph(graph);

      // CURSOR
      var chartCursor = new AmCharts.ChartCursor();
      chartCursor.cursorPosition = "mouse";
      chartCursor.categoryBalloonDateFormat = "JJ:NN, DD MMMM";
      chart.addChartCursor(chartCursor);

      // SCROLLBAR
      var chartScrollbar = new AmCharts.ChartScrollbar();

      chart.addChartScrollbar(chartScrollbar);

      // WRITE
      chart.write("chartdiv");
    }

    // generate some random data, quite different range 
    function generateChartData() {
      // current date
      var firstDate = new Date();
      // now set 1000 minutes back                 
      firstDate.setMinutes(firstDate.getDate() - 1000);

      // and generate 1000 data items
      for (var i = 0; i < 1000; i++) {
        var newDate = new Date(firstDate);
        // each time we add one minute
        newDate.setMinutes(newDate.getMinutes() + i);
        // some random number      
        var visits = Math.round(Math.random() * 40) + 10;
        // add data item to the array                          
        chartData.push({
            date: newDate,
            visits: visits
        });
      }
    }

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }

    FilterData.getAllDataBySensorName(function (data) {
      var field = {};

      for(var j = 0; j < data.length; j++)
      {
        field = data[j];
        var val1;
        var val2;

        for(var key in field)
        {
          if(key == "timed")
            val1 = field[key];
          else
            val2 = field[key];
        }

        chartData.push({
          date: val1,
          consumption: val2
        });
      }
    });

    $scope.getChartOption = function() {
     if(document.getElementById('chart_sel'))
     {
        var vSkill = document.getElementById('chart_sel');
        vSkillText = vSkill.options[vSkill.selectedIndex].innerHTML;

        if(vSkillText.localeCompare("Month Overview") == 0)
          GenetareChart();
      }
    }
  });