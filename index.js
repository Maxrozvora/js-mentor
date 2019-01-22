const todos = getTodos()

// Create new todo item
document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault()
    let text = e.target.elements.nameTodo.value
    let date = new Date().toLocaleString()
    let todo = {
        text,
        completed: false,
        date,
        id: doId()
    }
    todos.push(todo)
    setTodos(todos)
    resetAddTodoForm(e)
    console.log(getTodos()); // TODO console.log
})

// Clean form inputs
function resetAddTodoForm (e) {
    e.target.elements.nameTodo.value = ''
    e.target.elements.dueDate.value = ''
}

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
