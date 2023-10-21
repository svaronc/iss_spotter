const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};
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
const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation, printPassTimes };
