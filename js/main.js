// const films = []

// var listEL = document.querySelector(".list-item")


// getMovies("Avengers").then((result) => {
//     console.log(result.Search)
// }).catch(error => console.log(error))

// function renderUsers(users){
//     let fragment = new DocumentFragment()
//     users.forEach((user) => {
//         let liEl = document.createElement('li')
//         liEl.textContent = `${user.id} | ${user.title}`

//         fragment.appendChild(liEl)
//     })
//     listEL.innerHTML = null
//     listEL.appendChild(fragment)
// }

// fetch("http://www.omdbapi.com/?i=tt3896198&apikey")
//     .then(response => response.json())
//     .then(
//         result => {
//             renderUsers(result)
//             console.log(result)
//         },

//         error => {
//             console.error(error)
//         }
//     )



// var filmsEL = document.querySelector(".films")




// function renderUsers(users){
//     let fragment = new DocumentFragment()
//     users.forEach((user) => {
//         let liEl = document.createElement('li')
//         liEl.textContent = `${user.id} | ${user.name}`

//         fragment.appendChild(liEl)
//     })
//     filmsEL.innerHTML = null
//     filmsEL.appendChild(fragment)
// }


// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(
//         result => {
//             renderUsers(result)
//             console.log(result)
//         },

//         error => {
//             console.error(error)
//         }
// )



var todoForm = document.querySelector('.main-container');
var todoInput = document.querySelector('.form-control');

// todoForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const id = movies.length > 0 ? movies[movies.length - 1].id+ 1: 0;
//     const moviesTodo = {
//         id, 
//         title: todoInput.value, 
//     } 
//     movies.push(moviesTodo);
//     todoInput.value = '';
//     renderMovies(movies);
// })

function renderTodos(movies=[], node) {
    node.innerHTML = null;
    movies.slice(itemPerpage * (currentPage - 1), currentPage * itemPerpage).forEach((todo) => {
        node.appendChild(createCloneTodo(todo));
    });
};

function renderMovies(movies=[], node) {
    node.innerHTML = null;

    movies.forEach((movie) => {
        let movieItemEl =  cloneAndRender(movie);
        node.appendChild(movieItemEl);
    })
};

var moviesRow = document.querySelector('[data-element=movie-container]');

function cloneAndRender(movie) {
    let singleMovieTemplate = document.querySelector('#movie-item');
    let movieItemElClone = singleMovieTemplate.content.cloneNode(true);

    let movieImageEl = movieItemElClone.querySelector('[data-element=movie-img]');
    movieImageEl.src = movie.imageUrl;
    movieImageEl.style.height = '300px';
    // movieImageEl.addEventListener('error', () => {
    //     movieImageEl.src = movie.Poster;
    // })
    // let cinemImageEl = movieItemElClone.querySelector('[data-element=movie-poster]');
    // cinemImageEl.src = movie.Poster;
    // cinemImageEl.style.height = '300px';
    // cinemImageEl.addEventListener('error', () => {
    //     cinemImageEl.src = 'http://picsum.photos/200/200';
    // })
    movieItemElClone.querySelector('[data-element=movie-ids]').textContent = `ids: ` + movie.imdbID;
    movieItemElClone.querySelector('[data-element=movie-title]').textContent = `Titles: ` + movie.Title;
    movieItemElClone.querySelector('[data-element=movie-description]').textContent = `Text: ` + movie.Type;
    movieItemElClone.querySelector('[data-element=movie-years]').textContent = `Years: ` + movie.Year;

    movieItemElClone.querySelector('[data-element=movie-id]').textContent = `id: ` + movie.id;
    movieItemElClone.querySelector('[data-element=movie-year]').textContent = `year: ` + movie.year;
    movieItemElClone.querySelector('[data-element=movie-titles]').textContent = `title: ` + movie.title;

    return movieItemElClone;
}
renderMovies(movies, moviesRow);

var todoListEl = document.querySelector('.todo-list');
// todoListEl.addEventListener('change', (evnet) => {

// })
// var checkBoxChecked = document.querySelector('.todo-is-completed').checked = true

todoListEl.addEventListener('click', (event) => {
    if(event.target.dataset.task === 'delete') {
        // console.log(`Deleted: ` + event.target.dataset.todoId);
        movies = movies.filter(movie => movie.id != event.target.dataset.todoId)
        renderTodos(movies, todoListEl);
        // if(event.target.checked){
        // }
    }
})

function createCloneTodo(todo) {
    let templateTodoEl = document.querySelector('#todo-item');
    let cloneTodoItem = templateTodoEl.content.cloneNode(true);
    
    // cloneTodoItem.querySelector('.todo-id').textContent = 'id: ' + todo.imdbID;
    // cloneTodoItem.querySelector('.todo-title').textContent = todo.Title;
    // cloneTodoItem.querySelector('.todo-year').textContent = todo.Year + '-y.';
    // cloneTodoItem.querySelector('.todo-type').textContent = todo.Type;
    // cloneTodoItem.querySelector('.todo-poster').textContent = todo.Poster;

    cloneTodoItem.querySelector('.todo-id').textContent = 'id: ' + todo.id;
    cloneTodoItem.querySelector('.todo-title').textContent = todo.title;
    cloneTodoItem.querySelector('.todo-year').textContent = todo.year + '-y.';

    let deleteBtn = cloneTodoItem.querySelector('.todo-delete-btn');
    deleteBtn.dataset.todoId = todo.id;
    deleteBtn.dataset.task = 'delete';
    return cloneTodoItem;
}

renderTodos(movies, todoListEl);

//Pagination
var itemPerpage = 10;
var currentPage = 1;

renderTodos(movies, todoListEl);

var paginationEl = document.querySelector('.todo-pagination');

paginationEl.addEventListener('click', (event) => {
    // console.log(event.target.dataset.pageId);
    if(event.target.dataset.task == 'page') {
        currentPage = event.target.dataset.pageId;
        renderTodos(movies, todoListEl)
        renderPagination()
    }
})

// renderPagination();
var cinemas = []
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var todoInput = document.querySelector('.form-control');
    let value = todoInput.value
    getMovies(value).then((result) => {
        cinemas.push(result.Search)
        for(let cinema of cinemas) {
            for(var cinem of cinema) {
                movies.push(cinem)
                renderMovies(movies, moviesRow)
            }
        }
        console.log(movies);
    }).catch(error => console.log(error))
})