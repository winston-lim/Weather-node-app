const request = require("postman-request");

const getWeatherData = (data, callback) => {
  if (typeof data !== "object") {
    return;
  }
  const url = `http://api.weatherstack.com/current?access_key=b560a570a0918134a0db665c911672f4&query=${data.latitude},${data.longitude}&units=s`;
  request({ url, json: true }, (error, {body}) => { //{body} is obj destructuring; body = response.body
    if (error) {
      callback("Unable to connect to weather services");
      return;
    }
    if (body.error) {
      callback("Bad search terms, try another");
      return;
    }
    const currentData = body.current;
    const information = `It is currently ${currentData.temperature} Kelvin. It feels like ${currentData.feelslike} Kelvin out.`;
    callback(undefined,information);
  });
};

module.exports = getWeatherData;
