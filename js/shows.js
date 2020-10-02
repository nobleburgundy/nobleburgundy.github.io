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
//rest.bandsintown.com/artists/ 

function httpGet() {
  var xmlHttp = new XMLHttpRequest();
  /*   let artist1 = "The%20Federales";
    let artist2 = "Mr%20500";
    xmlHttp.open("GET", `https://rest.bandsintown.com/artists/${artist1}/events?app_id=jamesG`, false); // false for synchronous request
    xmlHttp.send(null);
    var response = xmlHttp.responseText;
    xmlHttp.open("GET", `https://rest.bandsintown.com/artists/${artist2}/events?app_id=jamesG`, false);
    xmlHttp.send(null);
    reponse +=  xmlHttp.responseText; */


  // var artists = ['The%20Federales', '101759042'];
  // var response2;
  // artists.forEach(element => {
  //   let artistElement = element;
  //   xmlHttp.open("GET", `https://rest.bandsintown.com/artists/${element}/events?app_id=jamesG`, false); // false for synchronous request
  //   xmlHttp.send(null);
  //   response2 += xmlHttp.responseText;
  // });
  response2 = "{'text': 'No shows at this time'}";
  return response2;
}

function parseShows() {
  var showData = null;
  try {
    showData = JSON.parse(httpGet());
  } catch (error) {
    return "<p><i>No shows scheduled at this time</i></p>";
  }
  let returnString = '';
  if (showData.length > 0) {
    for (var i = 0; i < showData.length; i++) {
      var venue = showData[i].venue.name + " ";
      var city = showData[i].venue.city + " ";
      var state = showData[i].venue.region + " ";
      var date = showData[i].datetime;
      var dateFormat = new Date(date);
      // remember getMonth() is zero indexed - others are not
      dateFormat = (dateFormat.getMonth() + 1) + "." + dateFormat.getDate() + "." + dateFormat.getFullYear() + " ";
      var artist = "(w/ " + showData[i].lineup[0] + ") ";
      var url = showData[i].url
      returnString += "<li><a target='_blank' href=" + url + ">" + dateFormat + venue + artist + '</a></li>'
    }
  } else {
    return "<p><i>No shows scheduled at this time</i></p>";
  }

  return returnString;
}

function navBarRender() {
  return ("<nav class=\"navbar\"><a class=\"navbar-item\" href=\"index.html\">Home</a><a class=\"navbar-item\" href=\"dev.html\">Dev Projects</a><a class=\"navbar-item\" href=\"shows.html\">Music</a><a class=\"navbar-item\" href=\"contact.html\">Contact</a></nav>");
}

function render() {
  try {
    document.getElementById('showsList').innerHTML = parseShows();
  } catch (error) {
    // console.log(error);  
  }
  document.getElementById('nav').innerHTML = navBarRender()
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


window.addEventListener('mousemove', e => {
  // TODO - create mouse as light source effect for shadow
  const titleBar = document.getElementsByClassName('title')[0];
  let windowWidth = window.innerWidth;
  let mouseX = e.clientX;
  let x = mouseX / (windowWidth / 2);
  let y = e.y / 50;
  var shadow = "";
  if (mouseX > windowWidth / 2) {
    shadow = x + "px " + y + "px #807676";
  } else {
    shadow = "-" + x + "px " + y + "px #807676";
  }
  console.log(`w w = ${windowWidth}\nmouseX = ${mouseX}\nshadow = ${shadow}`);
  titleBar.style.textShadow = shadow
})