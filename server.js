// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

NUMBER_OF_TABLES = 5;

// Reservations (DATA)
// =============================================================
var reservations = [
  {
    groupName: "smith",
    number: "512-867-5309",
    email: "smith.gmail.com",
    id: 314
  },
  {
    groupName: "jones",
    number: "512-867-5309",
    email: "jones.gmail.com",
    id: 159
  }
];

var waitingList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    console.log( "Sending to first page.." );
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
    console.log( "Going to the create reservation page.." );
    res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", function(req, res) {
    console.log( "Heading to the tables view.." );
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  console.log( "Returning json for reservations.." );
  return res.json(reservations);
});

// Displays all on the waiting list
app.get("/api/waitingList", function(req, res) {
    console.log( "Returning json for waiting list.." );
    return res.json(waitingList);
});

// Displays a single reservation, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Displays a single waiting list entry, or returns false
app.get("/api/waitingList/:waitingList", function(req, res) {
    var chosen = req.params.waitingList;
  
    console.log(chosen);
  
    for (var i = 0; i < waitingList.length; i++) {
      if (chosen === waitingList[i].routeName) {
        return res.json(waitingList[i]);
      }
    }
  
    return res.json(false);
});
  
// Create New Reservation entry - takes in JSON input
app.post("/api/add", function(req, res) {
  console.log( "Here in add: " + req );
  // Do we have any tables available?
  if ( reservations.length < NUMBER_OF_TABLES - 1 ) {
      // req.body hosts is equal to the JSON post sent from the user
      // This works because of our body parsing middleware
      var newReservation = req.body;

      console.log(newReservation);

      reservations.push( newReservation );

      res.json( newReservation );
    } else {
      // req.body hosts is equal to the JSON post sent from the user
      // This works because of our body parsing middleware
      var newWaitingList = req.body;

      console.log(newWaitingList);

      waitingList.push( newWaitingList );

      res.json( newWaitingList );
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
