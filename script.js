// Mehmet Kahya 
// 1 December 2023

let apiRequests = 0;
document.addEventListener("DOMContentLoaded", (event) => {
  async function getMovieData() {
    apiRequests++;
    document.getElementById('api-usage-bar').style.width = `${apiRequests / 10}%`;
    document.getElementById('api-usage-bar').setAttribute('aria-valuenow', apiRequests);
  
    // Clear previous movie data
    document.querySelector(".movies").innerHTML = "";
    document.getElementById("movieName").innerText = "";
    document.getElementById("movieLength").innerText = "";

    var movieName = document.getElementById("movie").value;
    let response = await fetch(
      "https://www.omdbapi.com/?t=" + movieName + "&apikey=YOUR_API_KEY"
    );
    let data = await response.json();

    var posterUrl = data.Poster;
    var img = document.createElement("img");
    img.src = posterUrl;
    document.querySelector(".movies").appendChild(img);

    var director = data.Director;
    document.getElementById("movieDirector").innerText = director;

    var actors = data.Actors;
    document.getElementById("movieActors").innerText = actors;

    var plot = data.Plot;
    document.getElementById("moviePlot").innerText = plot;

    var year = data.Year;
    document.getElementById("movieYear").innerText = year;

    var title = data.Title;
    document.getElementById("movieName").innerText = title;

    var notification = document.createElement("div");
    notification.id = "notification";
    document.body.appendChild(notification);

    if (data.Type === "series") {
      notification.innerText =
        "Calculating the length of the TV series can take a long time. Please wait...";
      setTimeout(() => (notification.style.opacity = "1"), 0);
      let totalRuntime = 0;
      let totalSeasons = Number(data.totalSeasons);

      for (let season = 1; season <= totalSeasons; season++) {
        let response = await fetch(
          `https://www.omdbapi.com/?t=${movieName}&Season=${season}&apikey=YOUR_API_KEY`
        );
        let data = await response.json();

        let episodePromises = data.Episodes.map((episode) =>
          fetch(
            `https://www.omdbapi.com/?t=${movieName}&Season=${season}&Episode=${episode.Episode}&apikey=YOUR_API_KEY`
          )
        );
        let episodeResponses = await Promise.all(episodePromises);
        let episodeData = await Promise.all(
          episodeResponses.map((response) => response.json())
        );

        for (let data of episodeData) {
          if (data.Runtime) {
            let runtimeStr = data.Runtime.split(" ")[0];
            let runtime = !isNaN(runtimeStr) ? Number(runtimeStr) : 0;
            totalRuntime += runtime;
          }
        }
      }

      let days = Math.floor(totalRuntime / (60 * 24));
      let hours = Math.floor((totalRuntime % (60 * 24)) / 60);
      let minutes = totalRuntime % 60;

      document.getElementById(
        "movieLength"
      ).innerText = `${days} days, ${hours} hours, ${minutes} minutes`;
    } else {
      let runtime = Number(data.Runtime.split(" ")[0]);
      let hours = Math.floor(runtime / 60);
      let minutes = runtime % 60;

      document.getElementById(
        "movieLength"
      ).innerText = `${hours} hours, ${minutes} minutes`;
    }
    notification.style.opacity = "0";
    setTimeout(() => document.body.removeChild(notification), 2000);
  }

  document.getElementById("submit").addEventListener("click", getMovieData);
});

document
  .getElementById("toggleDarkMode")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });

document.getElementById("movie").addEventListener("input", function () {
  if (this.value.toLowerCase() === "interstellar") {
    confetti({
      particleCount: 1000, // Increase this number for more confetti
      spread: 1000,
      origin: { y: 0.6 },
    });
    document.body.style.cursor = 'url("white-rose.png"), auto';
  }
});
