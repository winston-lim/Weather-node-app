const request = require("postman-request");

const getWeatherData = (data, callback) => {
  if (typeof data !== "object") {
    return;
  }
  const url = `http://api.weatherstack.com/forecast?access_key=b560a570a0918134a0db665c911672f4&query=${data.latitude},${data.longitude}&units=m`;
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
    const information = `It is currently ${currentData.temperature} degrees.
    The weather is ${currentData.weather_descriptions[0]}. The current humidity is ${currentData.humidity}, with a cloud cover of ${currentData.cloudcover} and a wind speed of
    ${currentData.wind_speed}
    `;
    callback(undefined,information);
  });
};

module.exports = getWeatherData;
