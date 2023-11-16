const URL = "https://654430cc5a0b4b04436c1ee9.mockapi.io/";
//Tomamos referencia del formulario
const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);


function generateUUID() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    uuid += Math.floor(Math.random() * 16).toString(16);
  }
  return uuid;
}

//función de procesamiento del formulario
function handleFormSubmit(e) {
  const movieData = new FormData(form);
  e.preventDefault();
  const uuid = generateUUID();

  const gens = movieData.get("genre").split(", ");

  const newMovie = {
    id: uuid,
    title: movieData.get("title"),
    year: movieData.get("year"),
    director: movieData.get("director"),
    duration: movieData.get("duration"),
    poster: movieData.get("poster"),
    genre: gens,
    rate: movieData.get("rate"),
  };
  addNewMovie(newMovie);
}

//método POST para crear una película en el backend
function addNewMovie(movie) {
  fetch(URL + "movies", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movie),
  }).then(res => {
    res.ok ? alert("Movie Created") : alert("Error");
   getAll();
  });

}
//metodo Put

  
  



