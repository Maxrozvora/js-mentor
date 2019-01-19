const todos = [
    {
        text: 'Buy bread',
        completed: false,
        date: '13.01.2019, 14:24:33',
        id: doId()
    },
    {
        text: 'Clean room',
        completed: false,
        date: '14.01.2019, 3:11:12',
        id: doId()
    },
    {
        text: 'Go to the river',
        completed: true,
        date: '12.01.2019, 15:64:54',
        id: doId()
    }
]

// Render todos
const renderTodos = (todos) => {
    document.querySelector('#todo-list').innerHTML = '';
    todos.forEach(todo => {
        document.querySelector('#todo-list').appendChild(generateDom(todo))
    })
}

const filterTodos = (todos) => {
    return todos.sort((a, b) => {
        return  b.date - a.date
    })
}

console.log(filterTodos(todos)); // TODO console.log

// Generate DOM Element for an individual todo
const generateDom = (todo) => {
    const newTodo = document.createElement('li')
    newTodo.className = 'list-group-item d-flex justify-content-between'
    // Create el for text todo
    const todoText = document.createElement('div')
    todoText.className = 'ml-3'
    todoText.innerHTML = ` <input class="form-check-input" id="${todo.id}" type="checkbox">
                            <label for="${todo.id}">${todo.text}</label>
                            <div class="small text-secondary">${todo.date}</div>`
    // Create wrapper for buttons
    const btnGroup = document.createElement('div')
    // Create btn for edit todo
    const btnEdit = document.createElement('button')
    btnEdit.className = 'btn btn-sm btn-secondary'
    btnEdit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>'
    // Create btn for delete todo
    const btnDelete = document.createElement('button')
    btnDelete.className = 'btn btn-sm btn-secondary'
    btnDelete.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>'
    // Add element to the li parent tag
    btnGroup.appendChild(btnEdit)
    btnGroup.appendChild(btnDelete)
    
    newTodo.appendChild(todoText)
    newTodo.appendChild(btnGroup)
    
    btnDelete.addEventListener('click', function () {
        removeTodo(this)
    })

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
        date,
        id: doId()
    }
    todos.unshift(todo)
    e.target.elements.addTodo.value = ''
    renderTodos(todos)
})

// Delete todo item
function removeTodo(el) {
    const removeEl = el.offsetParent
    const removeElId = removeEl.getElementsByTagName('input').item(0).id
    removeEl.remove()

    todos.forEach(function (item, index) {
        if(item.id === removeElId) {
            todos.splice(index, 1)
        }
    })
}

// Genetate random id
function doId() {
    return Math.random().toString(36).substr(2, 16)
}

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
