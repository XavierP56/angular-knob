angular.module('ui.knob', [])
  .directive('knob', function ($parse) {
    return {
      restrict: 'EACM',
      template: function(elem, attrs){
        return '<input value="0"></input>';
      },
      replace: true,
      scope: true,

      link: function (scope, elem, attrs) {

        scope.knob = scope.$eval(attrs.knobData);

        var renderKnob = function(){

          scope.knob = scope.$eval(attrs.knobData);

          var opts = {}; 
          if(!angular.isUndefined(attrs.knobOptions)){
            opts = scope.$eval(attrs.knobOptions);
          }

          if(!angular.isUndefined(attrs.knobMax)){
            var max = scope.$eval(attrs.knobMax);
            if(!angular.isUndefined(max)){

              opts.max = max;
            
            }
          }
          
          $elem = $(elem);
          $elem.val(scope.knob);
          $elem.change();
          update = {
                change: function (value) {
                    scope.$apply(function(){
                      $parse(attrs.knobData).assign(scope.$parent,value);
                      $parse(attrs.knobChanged)(scope.$parent)
                   });
                }
          };

          options = jQuery.extend(opts, update)
          $elem.knob(options);
        };

        scope.$watch(attrs.knobData, function () {
           renderKnob();
        });

        scope.$watch(attrs.knobOptions, function () {
          renderKnob();
        }, true);
      }
    };
  });