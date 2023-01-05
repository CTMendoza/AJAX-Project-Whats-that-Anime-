// query selecting the input element type text that holds the value of the anime title entered by the user
var $animeTitle = document.querySelector('#anime');
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
  $thumbnailContainer.textContent = '';
});

// query select div element that will be the container of anime thumbnails
var $thumbnailContainer = document.querySelector('.thumbnail-container');

// create a function that will create new dom elements that will become thumbnails of searched anime title
function renderThumbnails(anime) {
  var $colThirdDiv = document.createElement('div');
  $colThirdDiv.className = 'col-third';
  var $thumbnail = document.createElement('div');
  $thumbnail.className = 'thumbnail';
  $colThirdDiv.appendChild($thumbnail);
  var $thumbnailTitle = document.createElement('div');
  $thumbnailTitle.className = 'thumbnail-title';
  $thumbnail.appendChild($thumbnailTitle);
  var $h3Title = document.createElement('h3');
  $h3Title.className = 'h3-title';
  $h3Title.textContent = anime.title;
  $thumbnailTitle.appendChild($h3Title);
  var $thumbnailImg = document.createElement('img');
  $thumbnailImg.setAttribute('src', anime.images.jpg.large_image_url);
  $thumbnailImg.className = 'thumbnail-img';
  $thumbnail.appendChild($thumbnailImg);
  return $colThirdDiv;
}
// add an addEventlistener for the load event to update the dom to create thumbnails of the anime the user searched for
animeDataReq.addEventListener('load', function () {
  for (var i = 0; i < animeDataReq.response.data.length; i++) {
    var tbRender = renderThumbnails(animeDataReq.response.data[i]);
    $thumbnailContainer.appendChild(tbRender);
  }
});
