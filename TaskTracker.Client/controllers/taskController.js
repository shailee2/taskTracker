app.controller("TaskController", function($scope, $http) {
  const apiUrl = "http://localhost:5215/api/tasks";
  $scope.tasks = [];

  $http.get(apiUrl).then(response => {
    $scope.tasks = response.data;
  }).catch(error => console.error("GET error:", error));

  $scope.addTask = function() {
    $http.post(apiUrl, $scope.newTask).then(response => {
      $scope.tasks.push(response.data);
      $scope.newTask = {};
    }).catch(error => console.error("POST error:", error));
  };

  $scope.updateTask = function(task) {
    $http.put(apiUrl + "/" + task.id, task)
      .catch(error => console.error("PUT error:", error));
  };

  $scope.deleteTask = function(id) {
    $http.delete(apiUrl + "/" + id).then(() => {
      $scope.tasks = $scope.tasks.filter(t => t.id !== id);
    }).catch(error => console.error("DELETE error:", error));
  };
});
