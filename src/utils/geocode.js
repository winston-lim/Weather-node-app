const request = require("postman-request");

const getLatLng = (address, callback) => {
  if (typeof address !== "string") {
    return;
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1?&access_token=pk.eyJ1Ijoid2luc3RvbmxpbTEiLCJhIjoiY2tsdDdwdnoyMDNuczJvbzQxcG45bmh0dSJ9.LzKbhW1oCZLSVa7vm0FZjA`;
  request({ url, json: true }, (error, {body}) => { //{body} is obj destructuring; body = response.body
    if (error) {
      callback("Unable to connect to location services", "");
      return;
    }
    if (body.features.length === 0) {
      callback("Bad search terms, try another");
      return;
    }
    const latitude = body.features[0].center[1];
    const longitude = body.features[0].center[0];
    const location = body.features[0].place_name;
    callback(undefined, {
      latitude,
      longitude,
      location,
    });
  });
};

module.exports = getLatLng;
