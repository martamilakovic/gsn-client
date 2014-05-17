angular.module('gsnClientApp')
  .service("DrawRabbitTempChartService", function (FilterService){
    var chart;
    var charDataArray = [];
    var chartData = [];

    FilterService.setSensorName("keyboard");

    FilterService.getAllDataBySensorName(function (data) {
      var field = {};

      for(var j = data.length-1; j >= 0; j--)
      {
        field = data[j];
        var valTime;
        var val = [];
        var i = 0;

        for(var key in field)
        {
          if(key == "timed")
            valTime = field[key];
          else
          {
            val[i] = field[key];
            i++;
          }
        }
    
        var b1 = Math.round(Math.random() * (1000 + j)) + 500 + j * 2;

        for(var k = 0; k < val.length; k++)
        {
          chartData.push({
            date: valTime,
            value: val[k]
          });
        }
      }
    });

  this.GenerateChart = function() {
    chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "none",
      "pathToImages": "bower_components/chart/amcharts/images/",
      "dataProvider": chartData,
      "valueAxes": [{
        "axisAlpha": 0.2,
        "dashLength": 1,
        "position": "left"
      }],
      "graphs": [{
        "id":"g1",     
        "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>value: [[value]]</span></b>",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor":"#FFFFFF",
        "title": "red line",
        "valueField": "value",
        "useLineColorForBulletBorder":true
      }],
      "chartScrollbar": {
        "autoGridCount": true,
        "graph": "g1",
        "scrollbarHeight": 40
      },
      "chartCursor": {
        "cursorPosition": "mouse"
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "minPeriod": "mm",
        "gridAlpha": 0.07,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "exportConfig": {
        menuRight: '20px',
        menuBottom: '30px',
        menuItems: [{
        icon: 'http://www.amcharts.com/lib/3/images/export.png',
        format: 'png'   
        }]  
      },
      "trendLines": [],
      /*
      "graphs": [
        {
          "id":"g1",     
          "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>value: [[value]]</span></b>",
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor":"#FFFFFF",
          "title": "red line",
          "valueField": "value",
          "useLineColorForBulletBorder":true
        }/*
        {
          "bullet": "square",
          "id": "g2",
          "title": "graph 2",
          "valueField": "value"
        }
      ],*/
      "guides": [],

      "allLabels": [],

      "legend": {
        "useGraphSettings": true
      },

      "titles": [
        {
          "id": "Title-1",
          "size": 15,
          "text": "Chart Title"
        }
      ]
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();
  }
  // this method is called when chart is first inited as we listen for "dataUpdated" event
  function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
  }

});
