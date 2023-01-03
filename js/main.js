// query selecting the input element type text that holds the value of the anime title entered by the user
var $animeTitle = document.querySelector('#anime');
console.log($animeTitle);
// a function to create a new XMLHttpRequest to get anime data based on the string value of the input element above
var animeDataReq = new XMLHttpRequest();
function getReq(title) {
  animeDataReq.open('GET', 'https://api.jikan.moe/v4/anime?letter=' + title);
  animeDataReq.responseType = 'json';
  animeDataReq.send();
}

// an addEventlistener for the submit event on the form element that will execute a GET request
var $animeForm = document.getElementById('searchanime');
$animeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getReq($animeTitle.value);
  // animeDataReq.addEventListener('load', function () {
  //   console.log('animeDataReq.status is', animeDataReq.status);
  //   console.log('animeDataReq.response is', animeDataReq.response);
  // });
  console.log('Form submitted');
});
