function getKey(object) {
    for (var key in object) {
        return key;
    }
}

var DATES = [
    {"20150902": "A"}, // Michaelmas 2015
    {"20150907": "B"},
    {"20150914": "A"},
    {"20150921": "B"},
    {"20150928": "A"},
    {"20151005": "B"},
    {"20151012": "A"},
    {"20151103": "B"}, // Michaelmas HT 2015
    {"20151109": "A"},
    {"20151116": "B"},
    {"20151123": "A"},
    {"20151130": "B"},
    {"20151207": "A"},
    {"20151214": "B"},
    {"20160105": "A"} // Lent 2015
];

// Instantiate variables
var thisWeekLetter;
var nextWeekLetter;
var nextWeek;

// Retrieve dates using moment
var now = moment();
var startOfWeek = now.clone().startOf('isoWeek');
var endOfWeek = now.clone().endOf('isoWeek');

// Get the current week
var selectedDate;
for (var listNum = 0; listNum < DATES.length; listNum++) {
    selectedDate = moment(getKey(DATES[listNum]), "YYYYMMDD");

    if (selectedDate.isBetween(startOfWeek.clone().subtract(1, 'd'), endOfWeek.clone().add(1, 'd'), 'day') && selectedDate.isBefore(now)) {
        thisWeekLetter = DATES[listNum][selectedDate.format("YYYYMMDD")];
        break;
    }
}

// Get the next week
for (listNum = 0; listNum < DATES.length; listNum++) {
    selectedDate = moment(getKey(DATES[listNum]), "YYYYMMDD");
    if (selectedDate.isAfter(now)) {
        nextWeek = selectedDate.clone();
        nextWeekLetter = DATES[listNum][getKey(DATES[listNum])];
        break;
    }
}

if (thisWeekLetter === "A") {
    document.getElementById("answer").innerHTML = "It's an A week.";
} else if (thisWeekLetter === "B") {
    document.getElementById("answer").innerHTML = "It's a B week.";
} else {
    document.getElementById("answer").innerHTML = "Neither.";
}

if (nextWeekLetter === "A") {
    document.getElementById("next").innerHTML = "<b>" + nextWeekLetter + " week</b> starts in <b><span id=\"countdown-timer\"></span></b>.";
} else if (nextWeekLetter === "B") {
    document.getElementById("next").innerHTML = "<b>" + nextWeekLetter + " week</b> starts in <b><span id=\"countdown-timer\"></span></b>.";
} else {
    document.getElementById("next").innerHTML = "Error - Please email me at <a href=\"mailto:updatethissite@iamkelv.in\">updatethissite@iamkelv.in</a> and tell me to update this site!";
}

var timer = document.getElementById("countdown-timer");
timer.innerHTML = nextWeek.countdown(moment()).toString();
setInterval(function () {
    timer.innerHTML = nextWeek.countdown(moment()).toString();
}, 1000);