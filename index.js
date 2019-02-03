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
    console.log(todos); // TODO console.log
    const template = document.querySelector('#todo-item').innerHTML;
    Mustache.parse(template);
    document.querySelector('#todo-list2').innerHTML = Mustache.render(template, todos);
}

document.querySelector('.dropdown-menu').addEventListener('click', function (e) {    
    const sortMethod = e.target.dataset.sort;
    let sortArr = sortTodos(todos, sortMethod);
    displayTodos(sortArr)
});

//Sort todos
function sortTodos(todos, sortMethod) {
    switch (sortMethod) {
        // Sort by date
        case 'date':
             const sortArrByDate = todos.todos.sort((a, b) => {
                 const dateA = new Date(a.date);
                 const dateB = new Date(b.date);
                return (dateA - dateB);
            });
            return returnResultSort(sortArrByDate);
        // Sort by completed
        case 'done':
            const sortArrByDone = todos.todos.sort((a,b) => {
                return b.complete - a.complete;
            });
            return returnResultSort(sortArrByDone);
        // Sort by name
        case 'name':
            const sortArrByName =  todos.todos.sort((a,b) => {
                if (a.text > b.text) {
                    return 1; }
                if (a.text < b.text) {
                    return -1; }
                return 0;
            });
            return returnResultSort(sortArrByName);

    }
}

function returnResultSort(sortArr) {
    return {
        todos: sortArr
    };
}


displayTodos(todos);