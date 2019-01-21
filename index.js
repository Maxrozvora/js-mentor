const todos = getTodos()


// Render todos
// const renderTodos = (todos) => {
//     document.querySelector('#todo-list').innerHTML = '';
//     todos.forEach(todo => {
//         document.querySelector('#todo-list').appendChild(generateDom(todo))
//     })
// }

// Generate DOM Element for an individual todo
// const generateDom = (todo) => {
//     const newTodo = document.createElement('li')
//     newTodo.className = 'list-group-item'
//     newTodo.innerHTML = `<div class="d-flex justify-content-between">
//                         <div class="ml-3">
//                             <input class="form-check-input" type="checkbox">
//                             <span>${todo.text}</span>
//                             <div class="small text-secondary">${todo.date}</div>
//                         </div>
//                         <div>
//                             <button class="btn btn-sm btn-secondary">
//                                 <i class="fa fa-pencil" aria-hidden="true"></i>
//                             </button>
//                             <button class="btn btn-sm btn-secondary">
//                                 <i class="fa fa-trash-o" aria-hidden="true"></i>
//                             </button>
//                         </div>
//                     </div>`
//
//     return newTodo
// }

// Create new todo item
document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault()
    let text = e.target.elements.addTodo.value
    let date = new Date().toLocaleString()
    let todo = {
        text,
        completed: false,
        date,
        id: doId()
    }
    todos.push(todo)
    setTodos(todos)
    e.target.elements.addTodo.value = ''
    console.log(getTodos()); // TODO console.log
})

// Generate random id
function doId() {
    return Math.random().toString(36).substr(2, 16)
}

// Set todos to localStorage
function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Get saved todos from localStorage
function getTodos() {
    const todosJSON = localStorage.getItem('todos')
    if(todosJSON !==null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

console.log(getTodos()); // TODO console.log

// renderTodos(todos)
