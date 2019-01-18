const todos = [
    {
        text: 'Buy bread',
        completed: false,
        date: '13.01.2019, 14:24:33'
    },
    {
        text: 'Clean room',
        completed: false,
        date: '14.01.2019, 3:11:12'
    },
    {
        text: 'Go to the river',
        completed: true,
        date: '12.01.2019, 15:64:54'
    }
]

// Render todos
const renderTodos = (todos) => {
    document.querySelector('#todo-list').innerHTML = '';
    todos.forEach(todo => {
        document.querySelector('#todo-list').appendChild(generateDom(todo))
    })
}

// Generate DOM Element for an individual todo
const generateDom = (todo) => {
    const newTodo = document.createElement('li')
    newTodo.className = 'list-group-item'
    newTodo.innerHTML = `<div class="d-flex justify-content-between">
                        <div class="ml-3">
                            <input class="form-check-input" type="checkbox">
                            <span>${todo.text}</span>
                            <div class="small text-secondary">${todo.date}</div>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-secondary">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-sm btn-secondary">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>`

    return newTodo
}

// Create new todo item
document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault()
    let text = e.target.elements.addTodo.value
    let date = new Date().toLocaleString()
    let todo = {
        text,
        completed: false,
        date
    }
    todos.unshift(todo)
    e.target.elements.addTodo.value = ''
    renderTodos(todos)
})

// Create complete todo
document.querySelector('#todo-list').addEventListener('click', function (e) {

    if (e.target.tagName === 'LI') {
        e.target.checked = !e.target.checked
        console.log(e); // TODO console.log
    }
})
const completeTodo = () => {

}

renderTodos(todos)
