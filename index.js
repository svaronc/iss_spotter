const { nextISSTimesForMyLocation } = require("./iss");

// Function to print the upcoming ISS pass times
const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    // Create a new Date object initialized with the Unix Epoch (January 1, 1970)
    const datetime = new Date(0);

    // Set the date and time based on the 'risetime' property from passTimes
    datetime.setUTCSeconds(pass.risetime);

    // Get the duration of the pass
    const duration = pass.duration;

    // Print the information about the next pass
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// Call the 'nextISSTimesForMyLocation' function to fetch ISS pass times
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    // If there's an error, print an error message
    return console.log("It didn't work!", error);
  }
  // If successful, call the 'printPassTimes' function to display the pass times
  printPassTimes(passTimes);
});
