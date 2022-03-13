import { rejects } from "assert";
import { resolve } from "path/posix";

// Step 1: Get user coordinates
function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

    return new Promise((resolve,reject) => {
        async function success (pos:any) {
            var crd = pos.coords;
            var lat = crd.latitude.toString();
            var lng = crd.longitude.toString();
            var coordinates = [lat, lng];
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            const city = await getCity(coordinates);
            resolve(city);
    
        }

        function error(err:any) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            reject(`ERROR(${err.code}): ${err.message}`)
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}

// Step 2: Get city name
// H.W: change this function to async funtion that use our API openweathermap
function getCity(coordinates:any) {
    return new Promise((resolve,reject)=>{

        var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.9292d4e6acd2c0e8f8cc8d14df427016&lat=" +lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);


	function processRequest(e:any) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			var city = response.address.city;
			console.log(city);
			resolve(city)
		}
	}
    


    })
	
}



export function getCurrentCity() {
   return getCoordintes();
}