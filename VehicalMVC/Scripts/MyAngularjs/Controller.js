app.controller('vehicalapiController', function ($scope, vehicalapiService) {
   
   //Vehical API - To Clear all input controls.*******************
    function ClearModels() {
        $scope.OperType = 1;
        $scope.VehicalID = "";
        $scope.VehicalName = "";
        $scope.Color = "";
        $scope.Category = "";
        $scope.Company = "";
        $scope.City = "";
        $scope.Country = "";
    }


    //Vehical API - To Clear all Inputs controls value.*************************
    $scope.clear = function () {
        $scope.OperType = 1;
        $scope.VehicalID = "";
        $scope.VehicalName= "";
        $scope.Color= "";
        $scope.Category= "";
        $scope.Company = "";
        $scope.City = "";
        $scope.Country = "";
    }   
  
    // VehicalAPI = For Form  ***************************************
    $scope.OperType = 1;
    //VehicalAPI = 1 Mean New Entry**********************************
 
    GetAllVehicalAPIs();
    // VehicalAPI To Get All Records*********************************
    function GetAllVehicalAPIs() {
        var promiseGet = vehicalapiService.getAllVehicalAPI();
        promiseGet.then(function (pl) { $scope.Vehicals = pl.data },
              function (errorPl) {
                 // $log.error('VehicalAPI - Error in Getting Records.', errorPl);
                  console.log("VehicalAPI - Error in Getting Records."+ errorPl);
              });
    }
 
 
   //To Create new record and Edit an existing Record.****************
    $scope.save = function () {
        var Vehical = {
            VehicalName: $scope.VehicalName,
            Color: $scope.Color,
            Category: $scope.Category,
            Company: $scope.Company,
            City: $scope.City,
            Country: $scope.Country
        };
        if ($scope.OperType === 1) {
            var promisePost = vehicalapiService.post(Vehical);
            promisePost.then(function (pl) {
                $scope.VehicalID = pl.data.VehicalID;
                GetAllVehicalAPIs();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record             
            Vehical.VehicalID = $scope.VehicalID;
            var promisePut = vehicalapiService.put($scope.VehicalID, Vehical);
            promisePut.then(function (pl) {
                $scope.Message = "VehicalAPI Updated Successfuly";
                GetAllVehicalAPIs();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };
 
    //To Delete Record**********************************************************
    $scope.delete = function (Vehical) {
        var promiseDelete = vehicalapiService.delete(Vehical.VehicalID);
        promiseDelete.then(function (pl) {
            $scope.Message = "VehicalAPI Deleted Successfuly";
            GetAllVehicalAPIs();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }
 
    //To Get Vehical Detail on the Base of Vehical ID****************************
    $scope.get = function (Vehical) {
        var promiseGetSingle = vehicalapiService.get(Vehical.VehicalID);
 
        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.VehicalID = res.VehicalID;
            $scope.VehicalName = res.VehicalName;
            $scope.Color = res.Color;
            $scope.Category = res.Category;
            $scope.Company = res.Company;
            $scope.City = res.City;
            $scope.Country = res.Country;            
            $scope.OperType = 0;
        },
        function (errorPl) {
         console.log('Vehical - Error in Getting Details', errorPl);
        });
    }     
});
