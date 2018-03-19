var config = {
  apiKey: "AIzaSyDwUvroRMn-GhNWQ25LilaYRXJzcQ-ht-M",
  authDomain: "trainactivity-8a22f.firebaseapp.com",
  databaseURL: "https://trainactivity-8a22f.firebaseio.com",
  projectId: "trainactivity-8a22f",
  storageBucket: "trainactivity-8a22f.appspot.com",
  messagingSenderId: "48539152408"
};
firebase.initializeApp(config);

var database = firebase.database();

var tMinutesTillTrain;


$("#submitButton").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#trainName-Input").val().trim();
  var trainDestination = $("#destination-Input").val().trim();
  var time = $("#time-Input").val().trim();
  var trainFrequency = $("#frequency-Input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrainTime: time,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  console.log("TrainName: " + newTrain.name);
  console.log("Destination is" + newTrain.destination);
  console.log("Train time is: " + newTrain.firstTrainTime);
  console.log("Frequency is: " + newTrain.frequency);

  alert("Train successfully added!");



  $("#trainName-Input").val("");
  $("#destination-Input").val("");
  $("#time-Input").val("");
  $("#frequency-Input").val("");

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var time = childSnapshot.val().firstTrainTime;
  var trainFrequency = childSnapshot.val().frequency;

  var tFrequency = trainFrequency;

  var firstTime = time;

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));


  var diffTime = parseInt(moment().diff(moment(firstTimeConverted), "minutes"));
  console.log("DIFFERENCE IN TIME: " + diffTime);


  var tRemainder = parseInt(diffTime) % parseInt(tFrequency);
  console.log(tRemainder);

  tMinutesTillTrain = parseInt(tFrequency) - parseInt(tRemainder);
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  nextTrain = (moment(nextTrain).format("HH:mm"));

  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  console.log("TrainName: ", trainName);
  console.log("Train Destination: ", trainDestination);
  console.log("Time:", time);
  console.log("Frequency", trainFrequency);
  console.log("nextTrain", nextTrain);
  console.log("minutestillTrain", tMinutesTillTrain);


  $("#train-Table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + " min" + "</td><td>" + nextTrain + "</td><td>" + "Arrives in : " + tMinutesTillTrain + " min" + "</td></tr>");
});