var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://rest.bandsintown.com/artists/The%20Federales/events?app_id=jamesG");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "ce499da0-7072-ee93-4f8f-f2d447cd7dc7");

xhr.send(data);


function httpGet() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "https://rest.bandsintown.com/artists/The%20Federales/events?app_id=jamesG", false ); // false for synchronous request
  xmlHttp.send( null );
  var response = xmlHttp.responseText;
  return response;
}

function parseShows() {
  var showData = JSON.parse(httpGet());
  var returnString = '';
  console.info(showData);
  for (var i = 0; i < showData.length; i++) {
    var venue = showData[i].venue.name + " ";
    var city = showData[i].venue.city + " ";
    var state = showData[i].venue.region + " ";
    var date = showData[i].datetime;
    var dateFormat = date.substr(0, date.indexOf('T')) + " ";
    var artist = "(w/ " + showData[i].lineup[0] + ") ";
    returnString += '<li>' + dateFormat + venue + artist + '</li>'
  }
  document.getElementById('showsList').innerHTML = returnString;
}


