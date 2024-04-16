const express = require("express");
const app = express();

let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];

let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];

// Your routing, authentication, and controller code goes here
app.get("/parks", (req, res) => {
  res.json(parks);
});

app.get("/parks/:id", (req, res) => {
  const park = parks.find((p) => p.id == req.params.id);
  res.json(park);
});

app.get("/visitors", (req, res) => {
  res.json(visitors);
});

app.get("/visitors/:id", (req, res) => {
  const visitor = visitors.find((v) => v.id == req.params.id);
  let past = [];
  if (visitor.pastReservations.length > 0 && reservations.length > 1)
    visitor.pastReservations.forEach((n) =>
      reservations.map((r) => {
        if (r.id === n) past.push(r);
      })
    );
  let upcoming = [];
  if (visitor.upcomingReservations.length > 0 && reservations.length > 1)
    visitor.upcomingReservations.forEach((n) =>
      reservations.map((r) => {
        if (r.id === n) upcoming.push(r);
      })
    );

  res.json({
    ...visitor,
    pastReservations: past,
    upcomingReservations: upcoming,
  });
});
app.get("/reservations", (req, res) => {
  res.json(reservations);
});
app.get("/reservations/:id", (req, res) => {
  const reservation = reservations.find((r) => r.id == req.params.id);
  res.json(reservation);
});

app.listen(5000, () => {
  console.log("National Park Visitor System is running on port 5000");
});
