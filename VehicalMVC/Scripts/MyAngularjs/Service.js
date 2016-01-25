//-----------------------------------
//-----------------------------------
// Vehicalapi Service Layer 
//-This is The Service Layer for making Ajax Request--
//-----------------------------------
//-----------------------------------


// This is the main entry point ******
app.service('vehicalapiService', function ($http) {

    //Create the new  vehical record *************************
    this.post = function (Vehical) {     
        var request = $http({
            method: "post",
            url: "/api/VehicalAPI",
            data: Vehical
        });
        return request;
    }

    //Delete the Record of VehicalAPI*************************
    this.delete = function (VehicalID) {
        var request = $http({
            method: "delete",
            url: "/api/VehicalAPI/" + VehicalID
        });
        return request;
    }
    
    //Update the Record of VehicalAPI**************************
    this.put = function (VehicalID, Vehical) {
        var request = $http({
            method: "put",
            url: "/api/VehicalAPI/" + VehicalID,
            data: Vehical
        });
        return request;
    }

    // The Record of VehicalAPI************************** 
    //Get Single Records
    this.get = function (VehicalID) {
        return $http.get("/api/VehicalAPI/" + VehicalID);
    }
 
    //Get All VehicalAPI records
    this.getAllVehicalAPI = function () {
        return $http.get("/api/VehicalAPI");
    }    
});
