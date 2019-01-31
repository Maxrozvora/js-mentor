const todos = getTodos();

// Create new todo item
document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let text = e.target.elements.nameTodo.value;
    let date = new Date(e.target.elements.dueDate.value).toLocaleDateString();
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
// display todos on screen
function displayTodos(todos) {
    console.log(todos); // TODO console.log
    const template = document.querySelector('#todo-item').innerHTML;
    Mustache.parse(template);
    const rendered = Mustache.render(template, todos);
    document.querySelector('#todo-list2').innerHTML = rendered;
}

document.querySelector('.dropdown-menu').addEventListener('click', function (e) {    
    const sortMethod = e.target.dataset.sort;
    console.log(sortTodos(todos, sortMethod)); // TODO console.log
    let sortArr = sortTodos(todos, sortMethod);
    displayTodos(sortArr)
})

//Sort todos
function sortTodos(todos, sortMethod) {
    switch (sortMethod) {
        case 'date':
            //do something
            return todos.todos.sort((a, b) => {
                return b.date - a.date;
            });
        case 'done':
            return todos.todos.sort((a,b) => {
                return b.done - a.done;
            });
        case 'name':
            return todos.todos.sort((a,b) => {
                return b.text - a.text;
            });

    }
}

displayTodos(todos);