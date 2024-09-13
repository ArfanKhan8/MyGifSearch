document.getElementById("searchButton").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value.trim(); 
    if (searchInput) {
      fetchGifs(searchInput);
    }
  });
  
  function fetchGifs(query) {
    const apiKey = "2DrbGNIXQ6ucBcC9QE1MxyrLt3g2iZa2"; 
    const limit = 10; 
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&rating=g`;
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayGifs(data.data);
      })
      .catch((error) => {
        console.error("Error fetching GIFs:", error);
      });
  }
  
  function displayGifs(gifs) {
    const gifContainer = document.getElementById("gifContainer");
    gifContainer.innerHTML = ""; 
  
    gifs.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url; 
      gifContainer.appendChild(img);
    });
  }
  