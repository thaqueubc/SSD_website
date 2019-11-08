var url = "/sheets/ssd-schedule.xlsx";
var ssdSchedule = {};
var eventArray = [];
/* set up async GET request */
var req = new XMLHttpRequest();
req.open("GET", url, true);
req.responseType = "arraybuffer";

req.onload = function(e) {
  var data = new Uint8Array(req.response);
  var workbook = XLSX.read(data, {type:"array"});

  /* DO SOMETHING WITH workbook HERE */
  scheduleSheet = workbook.Sheets['Sheet1'];
  /* Get worksheet */
  ssdSchedule = XLSX.utils.sheet_to_json(scheduleSheet);

  // Put sheet JSON data into array for calendar events

ssdSchedule.forEach(function(day){
  let eventObj = {};
  eventObj.start = day["Date"];
  eventObj.title = day["Class"];
  if(day["Instructor"]) {
    eventObj.title += (' - ' + day["Instructor"]);
    if(day["Instructor"] == "Michael") {
      eventObj.color = '#C60A00'
    }
    if(day["Instructor"] == "Phil") {
      eventObj.color = '#FF4800'
    }
    if(day["Instructor"] == "Jason") {
      eventObj.color = '#8641BC'
    }
    if(day["Instructor"] == "Jeff") {
      eventObj.color = '#C51F71'
    }
    if(day["Instructor"] == "Alex") {
      eventObj.color = '#00B900'
    }
    if(day["Instructor"] == "Marlene") {
      eventObj.color = '#00A0B9'
    }
  } else {
    eventObj.color = 'black';
  }
  eventArray.push(eventObj);
});

// Render the calendar for desktop
var calendarDesktopEl = document.getElementById('calendar-desktop');

var calendarDesktop = new FullCalendar.Calendar(calendarDesktopEl, {
plugins: [ 'dayGrid', 'list' ],
defaultView: 'dayGridMonth',

header: {
    left: 'title',
    center: 'dayGridMonth,listMonth',
    right: 'today,prev,next'
},

events: eventArray
});
calendarDesktop.render();


var calendarMobileEl = document.getElementById('calendar-mobile');

var calendarMobile = new FullCalendar.Calendar(calendarMobileEl, {
plugins: [ 'list' ],
defaultView: 'listMonth',
height: 600,

header: {
    left: 'title',
    center: '',
    right: 'today,prev,next'
},
  titleFormat: {
    month: 'short',
    year: 'numeric',
  },
  
  listDayFormat: {
    weekday: 'long'
  },

  listDayAltFormat: {
    month: 'short',
    day: 'numeric'
  },

events: eventArray
});
calendarMobile.render();

}


req.send();




