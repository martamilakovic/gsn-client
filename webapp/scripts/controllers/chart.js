'use strict';

angular.module('gsnClientApp')
  .controller("Chart", function ($scope, FilterService, TableService, DrawRabbitTempChartService, DrawKeyboardTempChartService) {
 
    $scope.getSelectedSensor = function() {
     if(document.getElementById('selected_sen'))
     {
        var vSkill = document.getElementById('selected_sen');
        var vSkillText = vSkill.options[vSkill.selectedIndex].innerHTML;
        if(vSkillText.localeCompare("temprabbit") == 0)
        {
          DrawRabbitTempChartService.GenerateChart();
          TableService.GenerateTable();
        }
        else if(vSkillText.localeCompare("keyboard") == 0)
          DrawKeyboardTempChartService.GenerateChart();
      }
    }

    $scope.getChartOption = function() {
     if(document.getElementById('chart_sel'))
     {
        var vSkill = document.getElementById('chart_sel');
        var vSkillText = vSkill.options[vSkill.selectedIndex].innerHTML;
        /*
       if(vSkillText.localeCompare("Month Overview") == 0)
          DrawChartService.GenetareChart("temprabbit");
        else if(vSkillText.localeCompare("Single-Day Profile") == 0)
          DrawChartService.GenetareChart1();
        */
      }
    }
  });

