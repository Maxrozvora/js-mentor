const todos = getTodos();

// Create new todo item
document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let text = e.target.elements.nameTodo.value;
    let date = e.target.elements.dueDate.value;
    let todo = {
        text,
        completed: false,
        date,
        id: generateId()
    };
    todos.todos.push(todo);
    setTodos(todos);
    resetAddTodoForm(e);
    displayTodos(todos);
});

// Clean form inputs
function resetAddTodoForm (e) {
    e.target.elements.nameTodo.value = '';
    e.target.elements.dueDate.value = '';
}

// Generate random id
function generateId() {
    return Math.random().toString(36).substr(2, 16);
}

// Set todos to localStorage
function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get saved todos from localStorage
function getTodos() {
    const todosJSON = localStorage.getItem('todos');
    if(todosJSON !==null) {
        return JSON.parse(todosJSON);
    } else {
        return {
            todos: []
        };
    }
}

function displayTodos(todos) {
    const template = document.querySelector('#todo-item').innerHTML;
    Mustache.parse(template);
    const rendered = Mustache.render(template, todos);
    document.querySelector('#todo-list2').innerHTML = rendered;
}

displayTodos(todos);