angular.module('comment', [])
	.controller('MainCtrl', [
		'$scope', '$http',
		function ($scope, $http) {

			$scope.readingList = [];

			$scope.getAll = function () {
				return $http.get('/list').success(function (data) {
					angular.copy(data, $scope.readingList);
				});
			};

			$scope.create = function (item) {
				return $http.post('/list', item).success(function (data) {
					$scope.readingList.push(data);
				});
			};

			$scope.addItem = function () {
				if (!goodInput()) return;
				$scope.create({
					session: $scope.session,
					pictureUrl: $scope.pictureUrl,
					speaker: $scope.speaker,
					title: $scope.title,
					upvotes: 0,
				});
				clearInputs();
			};

			function goodInput() {
				return $scope.session != null && $scope.pictureUrl != null && $scope.speaker != null && $scope.title != null;
			}

			function clearInputs() {
				$scope.session = ''; $scope.pictureUrl = ''; $scope.speaker = ''; $scope.title = '';
			}

			$scope.test = function (item) {
				console.log(item);
			};

			$scope.upvote = function (item) {
				return $http.put('/list/' + item._id + '/upvote')
					.success(function (data) {
						item.upvotes += 1;
					});
			};

			$scope.delete = function (item) {
				return $http.delete('/list/' + item._id + '/delete')
					.success(function (data) {
						$scope.readingList.splice($scope.readingList.indexOf(item), 1);
					});
			};

			$scope.getAll();
		}
	]);
