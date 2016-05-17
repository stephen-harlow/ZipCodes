angular.module('verticalResizer', []);

angular.module('verticalResizer').directive('verticalResizer', ['$document', '$window', function($document, $window) {

    return {
        restrict: 'E',
        scope: {
            verticalResizerClass: '&'
        },
        template: '<div class="{{verticalResizerClass}}" style="{{verticalResizerStyle}}"></div>',
        link: function($scope, $element, $attrs) {
        
            var targetElement = angular.element(document.querySelector($attrs['targetSelector']));

            if (!$attrs['class']) {
                $scope.verticalResizerClass = "germanger-vertical-resizer";
            } else {
                $scope.verticalResizerClass = $attrs['class'];
            }
            
            if ($attrs['style']) {
                $scope.verticalResizerStyle = $attrs['style'];
            }

            $element.on('mousedown', function(event) {
                event.preventDefault();

                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                var scale = event.movementY;
                var currentHeight = parseInt(window.getComputedStyle(targetElement[0], null).getPropertyValue("height"));
                var newHeight = currentHeight + scale;

                if ($attrs['targetMinHeight']) {
                    if (newHeight < parseInt($attrs['targetMinHeight'])) {
                        return;
                    }
                }
                
                if ($attrs['targetMaxHeight']) {
                    if (newHeight > parseInt($attrs['targetMaxHeight'])) {
                        return;
                    }
                }

                targetElement.css({
                    height: newHeight + 'px'
                });

                // Trigger resize
                $window.dispatchEvent(new Event('resize'));
            };

            function mouseup(event) {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            };
        }
    };

}]);