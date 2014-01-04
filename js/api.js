// ********************SET YOUR API KEY HERE****************************
// Insert your World Weather Online API key here. README for more info.
var apiKey = 'PLACE-YOUR-API-KEY-HERE';
// *********************************************************************

// Check if valid API Key
function checkKeyValidity() {
    var url = "http://api.worldweatheronline.com/free/v1/weather.ashx?q=94103&format=json&key=" + apiKey;
	invalidKey = false;

	// Docs: http://app-framework-software.intel.com/api2/index.html#$_get
	keyTest = $.get(url, "GET", function(data) {});
	keyTest.onreadystatechange = function() {
		if (keyTest.readyState == 4) {
			if (keyTest.status == 403) {
				invalidKeyAlert();
				invalidKey = true;
			}
		}
	}
}

function invalidKeyAlert() {
	alert('Invalid API key. See README and edit js/api.js file.');
}

function search() { 
    if (invalidKey) {
        invalidKeyAlert();
        return false;
    }
    $("#result").html("<b>Fetching result...</b>");
    var url = "http://api.worldweatheronline.com/free/v1/weather.ashx?";
    url += "q=" + encodeURI($("#weather").val());
    url += "&format=json";
    url += "&key="+ apiKey;
    url += "&includelocation=yes";
    url += "&callback=searchCallback";
    $.ajax({
      dataType: "jsonp",
      url: url,
      success: searchCallback
    })
}

function searchCallback(data) {
    var serverResponse = data;
    try{
    $("div.search_result").html(generateRowHTML(
        serverResponse.data.nearest_area[0].areaName[0].value,
        serverResponse.data.current_condition[0].weatherIconUrl[0].value,
        serverResponse.data.current_condition[0].temp_F,
        serverResponse.data.current_condition[0].weatherDesc[0].value));
    } catch(ex) {
    $("div.search_result").html("<b>Not Available</b>");    
    }  
}

function generateRowHTML(currentLocation, imgURL, degree_F, description) {
    var html = "<div class=\"response_row\">";
    html += "<p class=\"current_location\">Current conditions for " + currentLocation + "<br /></p>";
    
    html += "<div class=\"response_desc\">";
    
    html += "<p class=\"weather_deg\">" + degree_F + " &deg;F" + "</p>";
    html += "<p class=\"weather_desc\">" + description + "</p>";
    html += "</div>";
    html += "<img src=\"" + imgURL + "\" height=\"64\" width=\"64\"/>";
    html += "</div>";
    
    return html;
}