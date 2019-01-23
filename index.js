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
    todos.push(todo);
    setTodos(todos);
    resetAddTodoForm(e);
    displayTodosOnScreen(todos);
})

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
        return [];
    }
}
// Display list todos
function displayTodosOnScreen(todos) {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        todoList.prepend(generateTodo(todo));
    })
}

// Generate item of todo
function generateTodo(todo) {
    const newTodo = document.createElement('li');
    newTodo.className = 'list-group-item d-flex justify-content-between';
    // Create el for text todo
    const todoText = document.createElement('div');
    todoText.className = 'ml-3';
    todoText.innerHTML = ` <input class="form-check-input" id="${todo.id}" type="checkbox">
                            <label for="${todo.id}">${todo.text}</label>
                            <div class="small text-secondary">${todo.date}</div>`;
    // Create wrapper for buttons
    const btnGroup = document.createElement('div');
    // Create btn for edit todo
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn btn-sm btn-secondary mr-1';
    btnEdit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    // Create btn for delete todo
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-sm btn-secondary';
    btnDelete.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    // Add element to the li parent tag
    btnGroup.appendChild(btnEdit);
    btnGroup.appendChild(btnDelete);

    newTodo.appendChild(todoText);
    newTodo.appendChild(btnGroup);

    return newTodo;
}

displayTodosOnScreen(todos);
