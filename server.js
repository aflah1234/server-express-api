const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", releaseYear: 2010, rating: 8.8 },
  { id: 2, title: "The Dark Knight", genre: "Action", releaseYear: 2008, rating: 9.0 },
  { id: 3, title: "Interstellar", genre: "Sci-Fi", releaseYear: 2014, rating: 8.6 }
];

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
});

app.post('/movies', (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    rating: req.body.rating
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  
  movie.rating = req.body.rating;
  res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).send('Movie not found');
  
  const deletedMovie = movies.splice(movieIndex, 1);
  res.json(deletedMovie[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
