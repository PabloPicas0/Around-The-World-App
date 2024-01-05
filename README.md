# Pocket Globe App

This app let's you explore all the counties of the world by clicking on them
on the draggable and zoomable globe.

## Country details through REST API

To fetch information about each country I'm using the following REST API endpoints:

- [REST Countries API](https://restcountries.eu/) - to get information such as country's capital, currency, etc.
- [Wikimedia REST API ](https://wikimedia.org/api/rest_v1/) - to get a short paragraph about a country

## Photos from Unsplash JSON API

All the photos used in the app come from [Unsplash JSON API](https://unsplash.com/developers) which provides free and high-resolution photos.

## Technologies used

- React
- D3 + TopoJSON + World Atlas TopoJSON
- Material-UI
- REST Countries API
- Unsplash API
- Wikimedia REST API
