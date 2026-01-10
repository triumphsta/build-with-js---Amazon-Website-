let todoList = [];

function addTodo() {
  const inputElement = document.querySelector(".js-name_input");
  const inputDate = document.querySelector(".js-date_input");
  const inputTime = document.querySelector('.js-time_input');

  const name = inputElement.value;
  const dueDate = inputDate.value;
  const dueTime = inputTime.value;

  if (name === '') return;

  todoList.push({ name, dueDate, dueTime });

  console.log(todoList);

  inputElement.value = '';
  inputDate.value = '';
  inputTime.value = '';

  renderTodoList();
}

function renderTodoList() {
  let todoHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const { name, dueDate, dueTime } = todoList[i];
    todoHTML += `<div class="js-out"> <span class="js-todo_output">
            <span>${name} </span> <span> ${dueDate} </span>  <span>${dueTime} </span> | 
             </span> <button onclick="todoList.splice(${i}, 1); renderTodoList()" class="delete">Delete</button>
             </div> <br>`;
  }

  document.querySelector('.todo_output').innerHTML = todoHTML;
  console.log(todoHTML);
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
    console.log(todoList);
  }
}
