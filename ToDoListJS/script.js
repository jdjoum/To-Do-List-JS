// To-Do List - (Copyright © 2021 Julian-Justin Djoum. All Rights Reserved.)

// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)


// Functions

function addTodo(event) {
	// Prevent the form from submitting	and the page refreshing
	event.preventDefault();

	// Create Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	// Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');

	// Add Todo to local storage
	saveLocalTodos(todoInput.value);

	// Add newTodo into the DIV
	todoDiv.appendChild(newTodo);

	// Create Check Mark Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");

	// Add completedButton into the DIV
	todoDiv.appendChild(completedButton);

	// Create Trash Button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");

	// Add completedButton into the DIV
	todoDiv.appendChild(trashButton);

	// Append Todo DIV to the list
	todoList.appendChild(todoDiv);

	// Reset/Clear todoInput value
	todoInput.value = "";
}

function deleteCheck(event) {
	const item = event.target;
	console.log(item);

	// DELETE TODO
	if(item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		// Animation
		todo.classList.toggle('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function() {
			todo.remove();
		});
	}

	// COMPLETE TODO
	if(item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}

}

function filterTodo(event) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo) {
		switch(event.target.value) {
			case "all":
				todo.style.display = 'flex';
				break;
			case "completed":
				if(todo.classList.contains("completed")) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if(!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	let todos;
	// CHECK: Anything saved yet?
	if(localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	// CHECK: Anything saved yet?
	if(localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function(todo) {
		// Create Todo DIV
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');

		// Create LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');

		// Add newTodo into the DIV
		todoDiv.appendChild(newTodo);

		// Create Check Mark Button
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("complete-btn");

		// Add completedButton into the DIV
		todoDiv.appendChild(completedButton);

		// Create Trash Button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");

		// Add completedButton into the DIV
		todoDiv.appendChild(trashButton);

		// Append Todo DIV to the list
		todoList.appendChild(todoDiv);
		});
}

function removeLocalTodos(todo) {
	// CHECK: Anything saved yet?
	if(localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1)
	localStorage.setItem("todos", JSON.stringify(todos));
}