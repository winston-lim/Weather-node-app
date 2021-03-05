const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "";
  messageTwo.textContent = "";
  const address = search.value;
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((response) => {
      if (response.error) {
        messageOne.textContent = response.error;
        return;
      }
      messageOne.textContent = response.location;
      messageTwo.textContent = response.weatherData;
    });
  });
});
