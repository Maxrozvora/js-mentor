const todos = getTodos();

// Create new todo item
document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let text = e.target.elements.nameTodo.value;
    let date = new Date(e.target.elements.dueDate.value);

    let todo = new todoItem(text, date);
    console.log(todo); // TODO console.log
    todos.todos.push(todo);
    setTodos(todos);
    resetAddTodoForm(e);
    displayTodos(todos);
});

// class todo item
class todoItem {
    constructor(text, date) {
        this.text = text;
        this.date = this.getDate(date);
        this.complete =  true;
        this.id = generateId();
    }
    getDate(date) {
        return date.toDateString();
    }
}

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
    const template = document.querySelector('#todo-item').innerHTML;
    Mustache.parse(template);
    document.querySelector('#todo-list2').innerHTML = Mustache.render(template, todos);
}

document.querySelector('.dropdown-menu').addEventListener('click', function (e) {    
    const sortMethod = e.target.dataset.sort;
    const sortOrder = e.target.dataset.order === 'asc' ? -1 : 1;
    toggleSortOrder(e);
    const sortArr = sortTodos(todos, sortMethod, sortOrder);
    displayTodos(sortArr)
});

//Sort todos
function sortTodos(todos, sortMethod, sortOrder) {

    switch (sortMethod) {
        // Sort by date
        case 'date':
             todos.todos = todos.todos.sort((a, b) => {
                 const dateA = new Date(a.date);
                 const dateB = new Date(b.date);
                return (dateA - dateB) * sortOrder;
            });
            return todos;
        // Sort by completed
        case 'complete':
            todos.todos = todos.todos.sort((a,b) => {
                return (b.complete - a.complete) * sortOrder;
            });
            return todos;
        // Sort by name
        case 'text':
            todos.todos =  todos.todos.sort((a,b) => {
                if (a.text > b.text) {
                    return 1 * sortOrder;
                }
                if (a.text < b.text) {
                    return -1 * sortOrder;
                }
                return 0;
            });
            return todos;
    }
}

function toggleSortOrder(e) {
    e.target.dataset.order = (e.target.dataset.order === 'asc') ? 'desc' : 'asc';
}



displayTodos(sortTodos(todos, 'date', -1));