const moviesContainer = document.getElementById("moviesContainer");

const URL = "https://654430cc5a0b4b04436c1ee9.mockapi.io/"; //aquí va la url base de vuestro proyecto de MockAPI
//Método GET
function getAll() {
  fetch(URL + "movies")
    .then(res => res.json())
    .then(movies => renderMovies(movies));
}
getAll();

//detectamos el click en los botones "Delete" y levantamos el id del recurso, que previamente
//adherimos al propio botón con el atributo data (así sabemos el id del recurso a borrar 😉)
document.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const id = e.target.dataset.id;
    const actualCard = e.target.closest("article");
    switch (e.target.id) {
      case "btnDelete":
        deleteOne(id, actualCard);
        break;
      case "btnEdit":
        addNewMovie()
        break;
    }
  }

});

/* Método DELETE
 * @param {id} id del recurso a borrar
 * @param {actualCard} elemento del DOM que contiene el recurso a borrar
 */

function deleteOne(id, actualCard) {
  fetch(URL + `movies/${id}`, {
    method: "delete",
  }).then(res => {
    if (res.ok) actualCard.remove();
  });
}

/*
 * @param {movies} array de elementos a renderizar
 */
function renderMovies(movies) {
  for (const movie of movies) {
    const movieCard = document.createElement("article");
    
    const movieData = `    
    <img src="${movie.poster}" alt="${movie.title}"/>
    <h2>${movie.title}</h2>
    <p>${movie.year}</p>
    <p>Directed by ${movie.director}</p>
    <p>${movie.genre.join(", ")}</p>

    <p>rating: ${movie.rate}</p>
    <div>
    <button data-id="${movie.id}" id="btnDelete">Delete</button>
    
    <button data-id="${movie.id}" id="btnEdit"  onclick="redirectToOtraPagina()" >Edit</button>
    
    <div>
    `;
    movieCard.innerHTML = movieData;
    moviesContainer.appendChild(movieCard);
  }

 
}  
 function redirectToOtraPagina() {
    window.location.href = "create.html";
  }
function editMovie(id, movie){
  fetch(URL + `movies/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(movie)
  }).then(res => {
      res.ok ? console.log("peli Creada"): console.log("no se puede editar")
    });
  }