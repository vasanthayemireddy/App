/*var app = angular.module("ReqManagement", []);*/
var app = angular.module("ReqManagement", ['ui.bootstrap']);
/*<script>
angular.module('fupApp', [])
    .directive('ngFiles', ['$parse', function ($parse) {

        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        };

        return {
            link: fn_link
        }
    } ])
    .controller('fupController', function ($scope, $http) {

        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        };
		
        // NOW UPLOAD THE FILES.
        $scope.uploadFiles = function () {
        	formdata.append("file",formdata.get(0));
            var request = {
                method: 'POST',
                url: '/uploadfile/',
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    alert(d);
                })
                .error(function () {
                });
        }
    });
</script>
*/

/*app.directive('ngFiles', ['$parse', function ($parse) {
		console.log("directive called");
      function fn_link(scope, element, attrs) {
          var onChange = $parse(attrs.ngFiles);
          element.on('change', function (event) {
        	  console.log("directive called Entered Onchange");
              onChange(scope, { $files: event.target.files });
          });
      };

      return {
          link: fn_link
      }
	  
} ]);*/
//new directive filemodal

app.directive('fileModel', ['$parse', function ($parse) { 
    return { 
        restrict: 'A', 
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel); 
            var modelSetter = model.assign;
            element.bind('change', function(){ 
                scope.$apply(function(){
                  modelSetter(scope, element[0].files[0]);
                }); 
            }); 
        } 
    }; 
}]);

/*app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined} 
        }) 
        .success(function(){ 
        }) 
        .error(function(){ 
        }); 
    } 
}]);*/





 
// Controller Part
app.controller("ReqController", function($scope, $http) {
	console.log(" ReqController Controller called...");
	
	
	
	  $scope.submit = function() {
		  
		  var uploadUrl = '/uploadfile';
		  //$scope.uploadFileToUrl($scope.requirementForm,uploadUrl);
		  $scope.uploadFileToUrl($scope.requirementForm.FileData,angular.toJson($scope.requirementForm),uploadUrl);
		  
	  };
	  
	  $scope.uploadFileToUrl = function(file,userForm, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        fd.append('user', userForm);
	        console.log(userForm);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined} 
	        }) 
	        .success(function(){ 
	        }) 
	        .error(function(){ 
	        }); 
	  }
	  
	
	var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
    	console.log("Get the files called...");
    	
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
            console.log(key + ' ' + value.name);
        });
        //console.log($files);
    };

    // NOW UPLOAD THE FILES.
   $scope.uploadFiles = function () {
	   console.log("upload Files Called"+formdata);
	   console.log(formdata.get(0));
	   formdata.append("file",formdata.get(0));
	   console.log(formdata);
        var request = {
            method: 'POST',
            url: '/uploadfile/',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                alert('file uploaded successfully');
            })
            .error(function () {
            });
    }
    
    
 
	  /*$scope.filteredTodos = [];*/
	  $scope.filteredEmps = [];
	  $scope.itemsPerPage = 4;
	  $scope.currentPage = 1;
	  $scope.totalRowsCount = "";
	  $scope.begin = "";
	  $scope.end = "";
	  $scope.fileHref="";
	  $scope.pdfUrl="";
	  $scope.fileURL="";
	    
    $scope.requirements = [];
    $scope.requirementForm = {
     
    		reqId:"",
    		reqName:"",
    		jobTitle:"",
    		duration:"",
    		payRate:"",
    		billRate:"",
    		billRateFrequency:"",
    		startDate:"",
    		workAutherization:"",
    		priority:"",
    		interviewMode:"",
    		noOfPositions:"",
    		address:"",
    		city:"",
    		country:"",
    		date:"",
    		zipCode:"",
    		company:"",
    		ContractType:"",    	
    		shareRequirement:"",
    		skills:"",
    		 degree:"",
    		 experience:"",
    		 requirementNote:"",
    		 publishJob:"",
    		 createdDate:"",
    		status:"",
    		clientDetails:"", 
    		fileName:"",
    		fileType:"",
    		FileData:"",
    		deleted:""
	     	
        
    };
	
		$scope.exportXls=function(){
			var grid=$scope.gridApi.grid;
			var rowTypes=uiGridExporterConstants.ALL;
			var colTypes=uiGridExporterConstants.ALL;
			uiGridExporterService.pdfExport(grid,rowTypes,colTypes);
		};
		$scope.exportExcel=function(){
			var grid=$scope.gridApi.grid;
			var rowTypes=uiGridExporterConstants.ALL;
			var colTypes=uiGridExporterConstants.ALL;
			uiGridExporterService.pdfExport(grid,rowTypes,colTypes);
		};
		$scope.exportText=function(){
			var grid=$scope.gridApi.grid;
			var rowTypes=uiGridExporterConstants.ALL;
			var colTypes=uiGridExporterConstants.ALL;
			uiGridExporterService.pdfExport(grid,rowTypes,colTypes);
		};
		$scope.exportCsv=function(){
			var grid=$scope.gridApi.grid;
			var rowTypes=uiGridExporterConstants.ALL;
			var colTypes=uiGridExporterConstants.ALL;
			uiGridExporterService.pdfExport(grid,rowTypes,colTypes);
		};
		$scope.countries=[{"name":"India"},{"name":"Canada"},{"name":"USA"}];


    
    /*$scope.makeTodos = function() {
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
	    //$scope.filteredEmps = $scope.requirements.slice(begin, end);	 
	        $http({
	            method: 'GET',
	            url: '/getrequirement/'+$scope.begin+"/"+$scope.end
	        }).then(
	            function(res) { // success
	                $scope.requirements = res.data;                
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
    _refreshrequirementData();
 
    // HTTP POST/PUT methods for add/edit requirement  
    // Call: http://localhost:8090/requirement
  $scope.submitrequirement = function() {
    	console.log("create Modal");
 alert("data successfully inserted");
        $http({
            method: 'POST',
            url: "/saverequirement",
            data: angular.toJson($scope.requirementForm),
            headers: {
                'Content-Type': 'application/json'
            }
       
        }).then(function(response) {
            $scope.requirements = response.data;
            $scope.$digest();
            _refreshrequirementData();
           }, function(response) {
               $scope.errortext = response.statusText;
           },
           );
    };
   
    $scope.editrequirementData = function(reqId) {
    	 console.log("Edit Modal : "+reqId);
    	 alert("data successfully updated");
        $http({
            method: 'PUT',
            url: "/requirement",
            data: angular.toJson($scope.requirementForm),
            headers: {
                'Content-Type': 'application/json'
            }
       
        }).then(function(response) {
            $scope.requirements = response.data;
            $scope.$digest();
           }, function(response) {
               $scope.errortext = response.statusText;
           });
    };
   
    $scope.searchrequirementData = function(requirement) {
   	 console.log("Search invoked : ");
   	 
   	 var id = document.getElementById("reqId").value;
   	 //alert(id);
   	 
     $http({
         method: 'GET',
         url: '/searchrequirement/'+reqId
     }).then(
         function(res) { // success
        	// console.log(res.data);
             $scope.requirements = res.data;
             //console.log(requirements);
         },
         function(res) { // error
             console.log("Error: " + res.status + " : " + res.data);
         }
     );
   };
   
	   
	   $scope.downloadFile = function(fileName) {
		   //$scope.fileHref = 'http://localhost:8090/download/vasantha doc.csv/db';

		   console.log("download invoked...")
		    var downloadPath = '/download/'+fileName+'/db/';
		    window.open(downloadPath, '_blank', '');
		}
	   
	   $scope.pdfUrl = function(fileData) {
		   //$scope.fileHref = 'http://localhost:8090/download/Employment_Agreement_of_Y_Vasantha_signing_log.pdf/db';
		   console.log("pdfUrl invoked..."+fileData);		   
		   $scope.pdfUrl = 'data:application/pdf;base64,'+fileData;
		   console.log("pdfUrl : "+$scope.pdfUrl);
		}
	   
	   $scope.getPdf = function(fileName){
		   $http.get('/api/reports/'+fileName+'/', {responseType: 'arraybuffer'})
		   .success(function (data) {
		     var file = new Blob([data], {type: 'application/pdf'});
		     var fileURL = URL.createObjectURL(file);
		     //$scope.content = $sce.trustAsResourceUrl(fileURL);
		     console.log("fileUrl : "+fileURL);
		    //window.open(fileURL);
		    //var myWindow = window.open(fileURL, "", "width=500,height=800");
		    //myPopup(fileURL, 'web', 1050, 550);
		       var myWidth=900;
		       var myHeight=550;
		       var left = (screen.width - myWidth) / 2;
	           var top = (screen.height - myHeight) / 4;
	           var myWindow = window.open(fileURL, "web", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
	           
		  //window.open($scope.content, '_pdfViewer', '');
		   });
		 }
	   
	   $scope.myPopup = function myPopup(myURL, title, myWidth, myHeight) {
           var left = (screen.width - myWidth) / 2;
           var top = (screen.height - myHeight) / 4;
           var myWindow = window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
        }
	   
	   $scope.myFunction = function(){
		   /*$http.get('/api/reports/'+fileName+'/', {responseType: 'arraybuffer'})
		   .success(function (data) {
		     var file = new Blob([data], {type: 'application/pdf'});
		     var fileURL = URL.createObjectURL(file);
		   
		   var myWindow = window.open("http://www.google.com", "", "width=500,height=800");   
		   });*/
		   var myWindow = window.open("http://www.google.com", "", "width=500,height=800");
	   }
	   
	   
	   
	   app.filter('trustUrl', function ($sce) {
		    return function(fileURL) {
		      return $sce.trustAsResourceUrl(fileURL);
		    };
		  });
	   /*var ngBindHtmlDirective = ['$sce', function($sce) {
		   return function(scope, element, attr) {
		     scope.$watch($sce.parseAsHtml(attr.ngBindHtml), function(value) {
		       element.html(value || '');
		     });
		   };
		 }];*/
 
    $scope.createrequirement = function() {
        _clearFormData();
    }
 
    // HTTP DELETE- delete requirement by Id
    // Call: http://localhost:8090/requirement/{empId}
    $scope.deleterequirement = function(requirement) {
    	console.log(requirement);
    	var r = confirm("Are you sure you want to delete ?");
    	if (r == true) {
    		$http({
                method: 'DELETE',
                url: '/deleterequirement/' + requirement.reqId
            }).then(_success, _error);
    	} else {
    	  return;
    	}
        
    };
 
    // In case of edit
    $scope.editrequirement = function(requirement) {
    	//jobTitle=?,duration=?,payRate=?,billRate=?,billRateFrequency=?,startDate=?,workAutherization=?,priority=?,interviewMode=?,noOfPositions=?,"
    			//	+ "address=?,city=?,country=?,zipCode=?,company=?,ContractType=?,skills=?,degree=?,experience=? where reqId=?
    	
        $scope.requirementForm.jobTitle = requirement.jobTitle;
        $scope.requirementForm.duration = requirement.duration;
        $scope.requirementForm.payRate=requirement.payRate;
        $scope.requirementForm.billRate=requirement.billRate;
        $scope.requirementForm.billRateFrequency=requirement.billRateFrequency;
        $scope.requirementForm.startDate=requirement.startDate;
        $scope.requirementForm.workAutherization=requirement.workAutherization;
        $scope.requirementForm.priority=requirement.priority;
        $scope.requirementForm.interviewMode=requirement.interviewMode;
        $scope.requirementForm.noOfPositions=requirement.noOfPositions;
        $scope.requirementForm.address=requirement.address;
        $scope.requirementForm.city=requirement.city;
        
        $scope.requirementForm.country=requirement.country;
        $scope.requirementForm.zipCode=requirement.zipCode;
        $scope.requirementForm.company=requirement.company;
        $scope.requirementForm.ContractType=requirement.ContractType;
        $scope.requirementForm.skills=requirement.skills;
        $scope.requirementForm.degree=requirement.degree;
        $scope.requirementForm.experience=requirement.experience;
        
        $scope.requirementForm.reqid=requirement.reqid;
		
        
    };
    
    function _getRowsCount() {    	
        $http({
            method: 'GET',
            url: '/getrequirementCount'
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
    // HTTP GET- get all requirements collection
    // Call: http://localhost:8090/requirements
    function _refreshrequirementData() {   
    	/*$scope.begin=$scope.currentPage;
    	$scope.end=$scope.itemsPerPage;*/
    	
    	console.log("hi i m refresh vasantha");
    	 $scope.begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		 $scope.end = $scope.begin + $scope.itemsPerPage;
        $http({
            method: 'GET',
            url: '/getrequirement/'+$scope.begin+"/"+$scope.end
        }).then(
            function(res) { // success
                $scope.requirements = res.data;     
                console.log($scope.requirements);
               /* $scope.figureOutTodosToDisplay();*/
                _getRowsCount();
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
 
    function _success(res) {
        _refreshrequirementData();
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
    	
        $scope.requirementForm.jobTitle = "";
        $scope.requirementForm.duration = "";
        $scope.requirementForm.payRate="";
        $scope.requirementForm.billRate="";
        $scope.requirementForm.billRateFrequency="";
        $scope.requirementForm.startDate="";
        $scope.requirementForm.workAutherization="";
        $scope.requirementForm.priority="";
        $scope.requirementForm.interviewMode="";
        $scope.requirementForm.noOfPositions="";
        $scope.requirementForm.address="";
        $scope.requirementForm.city="";
        
        $scope.requirementForm.country="";
        $scope.requirementForm.zipCode="";
        $scope.requirementForm.company="";
        $scope.requirementForm.ContractType="";
        $scope.requirementForm.skills="";
        $scope.requirementForm.degree="";
        $scope.requirementForm.experience="";
        
        $scope.requirementForm.reqid="";
       
        
    };
});