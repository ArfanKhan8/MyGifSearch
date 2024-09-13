let currentQuery = "";  
let offset = 0;         

document.getElementById("searchButton").addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput) {
      currentQuery = searchInput; 
      offset = 0;  
      fetchGifs(currentQuery);
  }
});

document.getElementById("clearButton").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  currentQuery = "";  
  offset = 0;         
  displayTrendingGifs();  
});

document.getElementById("loadMoreButton").addEventListener("click", function () {
  loadMoreGifs();  
});

function fetchGifs(query) {
  const apiKey = "2DrbGNIXQ6ucBcC9QE1MxyrLt3g2iZa2";
  const limit = 10;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=g`;

  fetch(url)
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then((data) => {
          document.getElementById("trendingHeading").style.display = "none"; 
          if (offset === 0) {
              
              document.getElementById("gifContainer").innerHTML = "";
          }
          displayGifs(data.data);
          offset += limit; 
          document.getElementById("loadMoreButton").style.display = "block";  
      })
      .catch((error) => {
          console.error("Error fetching GIFs:", error);
      });
}

function displayGifs(gifs) {
  const gifContainer = document.getElementById("gifContainer");

  gifs.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      gifContainer.appendChild(img);
  });
}

function displayTrendingGifs() {
  const apiKey = "2DrbGNIXQ6ucBcC9QE1MxyrLt3g2iZa2";
  const limit = 20;
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}&rating=g`;

  fetch(url)
      .then((response) => response.json())
      .then((data) => {
          document.getElementById("trendingHeading").style.display = "block";  
          if (offset === 0) {
              document.getElementById("gifContainer").innerHTML = ""; 
          }
          displayGifs(data.data);
          offset += limit; 
          document.getElementById("loadMoreButton").style.display = "block"; 
      })
      .catch((error) => console.error("Error fetching trending GIFs:", error));
}

function loadMoreGifs() {
  if (currentQuery) {
      
      fetchGifs(currentQuery);
  } else {
      
      displayTrendingGifs();
  }
}


window.onload = function() {
  currentQuery = "";  
  offset = 0;         
  displayTrendingGifs();
};
