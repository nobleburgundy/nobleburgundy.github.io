// var data = null;
//
// var xhr             = new XMLHttpRequest();
// xhr.withCredentials = true;
//
// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });
//
// xhr.open("GET", "https://rest.bandsintown.com/artists/The%20Federales/events?app_id=jamesG");
// xhr.setRequestHeader("cache-control", "no-cache");
// xhr.setRequestHeader("postman-token", "ce499da0-7072-ee93-4f8f-f2d447cd7dc7");
//
// xhr.send(data);


function httpGet() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "https://rest.bandsintown.com/artists/MR%20500/events?app_id=jamesG", false); // false for synchronous request
  xmlHttp.send(null);
  var response = xmlHttp.responseText;
  return response;
}

function parseShows() {
  var showData = null;
  try {
    showData     = JSON.parse(httpGet());
  } catch (error) {
    return "<p><i>No shows scheduled at this time</i></p>";
  }
  var returnString = '';
  console.info(showData.length);
  for (var i = 0; i < showData.length; i++) {
    var venue      = showData[i].venue.name + " ";
    var city       = showData[i].venue.city + " ";
    var state      = showData[i].venue.region + " ";
    var date       = showData[i].datetime;
    var dateFormat = new Date(date);
    // remember getMonth() is zero indexed - others are not
    dateFormat     = (dateFormat.getMonth() + 1) + "." + dateFormat.getDate() + "." + dateFormat.getFullYear() + " ";
    var artist     = "(w/ " + showData[i].lineup[0] + ") ";
    var url        = showData[i].url
    returnString += "<li><a target='_blank' href=" + url + ">" + dateFormat + venue + artist + '</a></li>'
  }

  return returnString;
}

function navBarRender() {
  return ("<nav class=\"navbar\"><a class=\"navbar-item\" href=\"index.html\"><p>Home</p></a><a class=\"navbar-item\" href=\"shows.html\"><p>Shows</p></a><a class=\"navbar-item\" href=\"press.html\"><p>Contact</p></a></nav>");
}

function render() {
  var renderArray = [
    document.getElementById('nav').innerHTML = navBarRender(),
    document.getElementById('showsList').innerHTML = parseShows(),
  ];

  for (var i = 0; i < renderArray.length; i++) {
    try {
      renderArray[i];
    } catch (err) {
      console.log(err);
    }
  }
}

function renderEmailThankYouModal() {
  console.log('renderEmailThankYouModal() called');
  var element = document.getElementById('emailModal');
  if (element.className.indexOf('is-active') > -1) {
    element.classList.remove('is-active');
    document.getElementById('contactForm').reset();
  } else {
    element.classList.add('is-active')
  }
}
