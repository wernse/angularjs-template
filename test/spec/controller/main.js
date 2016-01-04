describe('metricsCtrl', function() {
  beforeEach(module('metrics'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('test', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('metricsCtrl', { $scope: $scope });
    });

    it('should have text = "meow"', function(){
      expect(controller.cow).toBe("meow");
       });
    it('$scope should have meow',function () {
       expect($scope.cow).toBe("meow");
    })
  });
});
