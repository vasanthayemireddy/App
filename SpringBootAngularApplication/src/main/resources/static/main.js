/*var app = angular.module("EmployeeManagement", []);*/
var app = angular.module("EmployeeManagement", ['ui.bootstrap']);
 
// Controller Part
app.controller("EmployeeController", function($scope, $http) {
 
	  /*$scope.filteredTodos = [];*/
	  $scope.filteredEmps = [];
	  $scope.itemsPerPage = 4;
	  $scope.currentPage = 1;
	  $scope.totalRowsCount = "";
	  $scope.begin = "";
	  $scope.end = "";
	  
	 
	  
	  
    $scope.employees = [];
    $scope.employeeForm = {
        candidateId:"",
        firstName: "",
        lastName: "" ,
        email:"" 	,
        phone:""   ,
        dob:""    ,
        jobTitle:"",
        
        city:"",
        state:"",
        country:"",
        createdBy:"",
        createdDate:"",
        activeStatus:"",
        deleted:"",
        fullName:function(){
        	return firstName+""+lastName ;
        }	
        	
     };
    
    
   /* $scope.makeTodos = function() {
	    $scope.todos = [];
	    for (i=1;i<=1000;i++) {
	      $scope.todos.push({ text:'todo '+i, done:false});
	    }
	  };*/
	  
	  $scope.figureOutTodosToDisplay = function() {
		  console.log($scope.currentPage+","+$scope.itemsPerPage);
		 $scope.begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		 $scope.end = $scope.itemsPerPage;
		 console.log($scope.begin+","+$scope.end);
	   //$scope.filteredEmps = $scope.employees.slice(begin, end);	 
	        $http({
	            method: 'GET',
	            url: '/getemployee/'+$scope.begin+"/"+$scope.end
	        }).then(
	            function(res) { // success
	                $scope.employees = res.data;                
	               /* $scope.figureOutTodosToDisplay();*/
	                _getRowsCount();
	            },
	            function(res) { // error
	                console.log("Error: " + res.status + " : " + res.data);
	            }
	        );
	    
	  };
	  
	  /*$scope.makeTodos();*/ 
	 // $scope.figureOutTodosToDisplay();

	  $scope.pageChanged = function() {
	    $scope.figureOutTodosToDisplay();
	  };
    
    
	  _getRowsCount(); 
    // Now load the data from server
    _refreshEmployeeData();
 
    // HTTP POST/PUT methods for add/edit employee  
    // Call: http://localhost:8090/employee
    $scope.submitEmployee = function() {
    	console.log("create Modal");
 alert("data successfully inserted");
        $http({
            method: 'POST',
            url: "/saveemployee",
            data: angular.toJson($scope.employeeForm),
            headers: {
                'Content-Type': 'application/json'
            }
       
        }).then(function(response) {
            $scope.employees = response.data;
            $scope.$digest();
            _refreshEmployeeData();
           }, function(response) {
               $scope.errortext = response.statusText;
           },
           );
    };
   
    $scope.editEmployeeData = function(id) {
    	 console.log("Edit Modal : "+id);
    	 alert("data successfully updated");
        $http({
            method: 'PUT',
            url: "/employee",
            data: angular.toJson($scope.employeeForm),
            headers: {
                'Content-Type': 'application/json'
            }
       
        }).then(function(response) {
            $scope.employees = response.data;
            $scope.$digest();
           }, function(response) {
               $scope.errortext = response.statusText;
           });
    };
   
    $scope.searchEmployeeData = function(employee) {
   	 console.log("Search invoked : ");
   	 
   	 var id = document.getElementById("candidateId").value;
   	 //alert(id);
   	 
     $http({
         method: 'GET',
         url: '/searchemployee/'+id
     }).then(
         function(res) { // success
        	// console.log(res.data);
             $scope.employees = res.data;
             //console.log(employees);
         },
         function(res) { // error
             console.log("Error: " + res.status + " : " + res.data);
         }
     );
   };
 
    $scope.createEmployee = function() {
        _clearFormData();
    }
 
    // HTTP DELETE- delete employee by Id
    // Call: http://localhost:8090/employee/{empId}
    $scope.deleteEmployee = function(employee) {
    	console.log(employee);
    	var r = confirm("Are you sure you want to delete ?");
    	if (r == true) {
    		$http({
                method: 'DELETE',
                url: '/deleteemployee/' + employee.candidateId
            }).then(_success, _error);
    	} else {
    	  return;
    	}
        
    };
 
    // In case of edit
    $scope.editEmployee = function(employee) {
    	$scope.employeeForm.candidateId=employee.candidateId;
        $scope.employeeForm.firstName = employee.firstName;
        $scope.employeeForm.lastName = employee.lastName;
        $scope.employeeForm.jobTitle=employee.jobTitle;
        $scope.employeeForm.phone=employee.phone;
        $scope.employeeForm.email=employee.email;
        $scope.employeeForm.dob=employee.dob;
        $scope.employeeForm.activeStatus=employee.activeStatus;
        $scope.employeeForm.city=employee.city;
        $scope.employeeForm.state=employee.state;
        $scope.employeeForm.country=employee.country;
        $scope.employeeForm.createdBy=employee.createdBy;
        $scope.employeeForm.createdDate=employee.createdDate;
        
    };
    
    function _getRowsCount() {    	
        $http({
            method: 'GET',
            url: '/getemployeeCount'
        }).then(
            function(res) { // success
                $scope.totalRowsCount = res.data;
                console.log($scope.totalRowsCount);
                /*$scope.figureOutTodosToDisplay();*/
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
 
    // Private Method  
    // HTTP GET- get all employees collection
    // Call: http://localhost:8080/employees
    function _refreshEmployeeData() {   
    	/*$scope.begin=$scope.currentPage;
    	$scope.end=$scope.itemsPerPage;*/
    	 $scope.begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		 $scope.end = $scope.begin + $scope.itemsPerPage;
        $http({
            method: 'GET',
            url: '/getemployee/'+$scope.begin+"/"+$scope.end
        }).then(
            function(res) { // success
                $scope.employees = res.data;     
                console.log("candidates : "+$scope.employees);
               /* $scope.figureOutTodosToDisplay();*/
                _getRowsCount();
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
 
    function _success(res) {
        _refreshEmployeeData();
        _clearFormData();
    }
 
    function _error(res)     {
        var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
        alert("Error: " + status + ":" + data);
    }
 
    // Clear the form
    function _clearFormData() {
        $scope.employeeForm.candidateId = "";
        $scope.employeeForm.firstName = "";
        $scope.employeeForm.lastName = "";
        $scope.employeeForm.jobTitle="";
        $scope.employeeForm.email = "";
        $scope.employeeForm.phone = "";
        $scope.employeeForm.dob = "";
        $scope.employeeForm.activeStatus = "";
        $scope.employeeForm.city = "";
        $scope.employeeForm.state = "";
        $scope.employeeForm.contry = "";
        $scope.employeeForm.createdBy = "";
        $scope.employeeForm.createdDate="";
        
    };
});