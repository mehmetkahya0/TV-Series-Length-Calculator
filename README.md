# Movie & TV Series Length Calculator

This is a simple web application that calculates the total length of a movie or TV series. It uses the OMDB API to fetch movie data.
## Live: https://movielengthcalculator.mehmet0.repl.co/

## Features

- Fetches data from the OMDB API
- Displays movie/TV series poster
- Calculates total length of a movie or TV series
- Displays additional movie information such as director, year, actors, and plot
- Includes a progress bar to track API usage (limit of 1000 requests per day)
- Includes a confetti animation when the user enters "interstellar" <3
- Allows the user to toggle between light and dark themes

## Usage

1. Enter the name of a movie or TV series in the input field.
2. Click the "Submit" button.
3. The application will display the total length of the movie or TV series, along with additional information.

## Dependencies

- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

## Note

This project is for educational purposes only. Please use responsibly and respect the terms of use of the OMDB API.

## To get the OMDB API key, follow these steps:

- Go to the OMDB API website: http://www.omdbapi.com/apikey.aspx
- Click on the "FREE!" button under the "Free Key" section.
- Fill out the form with your details. You'll need to provide your first name, last name, and email address. You also need to agree to the terms of service.
- Click on the "Submit" button.
- You'll receive an email with a link to activate your API key. Click on the link to activate your key.
- Once your key is activated, you can use it in your API requests. Replace your_api_key in the following URL with your actual API key: https://www.omdbapi.com/?apikey=your_api_key
- Please note that the free API key has a limit of 1,000 requests per day. If you need to make more requests, you can purchase a premium key.

