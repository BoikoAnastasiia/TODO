// сделать список планов на день
// добовление задачи, (титулка, заголовок, дата завершение)
// изменение статуса (активное, завершонное), ее можно завершить и вернуть из завершенных
// удаление задачи
// редактирование задачи

// драг анд дроп, (изменение порядка задач)

const headlineText = document.getElementById('headline_text');
const todoBody = document.getElementById('todo_body');
const addNewTodoButton = document.getElementById('add_new_todo');
const todoList = document.getElementById('todo_list');

addNewTodoButton.addEventListener('click', () => {
  const headlineTodo = headlineText.value;
  const bodyTodo = todoBody.value;
  if (headlineTodo != '' && bodyTodo != '') {
    addNewToDo(headlineTodo, bodyTodo);
    headlineText.value = '';
    todoBody.value = '';
  } else {
    alert('some input is empty');
  }
});

function addNewToDo(headline, todoText) {
  const newItem = document.createElement('li');
  newItem.innerHTML = `
    <h2>${headline}</h2>
    <p>${todoText}</p>
    <div>
      <label class="test">
          <input type="checkbox" class="finish_button">
          <span></span>
        </label>
      <button type="button" class="delete_button">
          delete
        </button>
    </div>
  `;
  todoList.appendChild(newItem);
  addButtonListener(newItem);
}

function addButtonListener(item) {
  const finishButton = item.querySelector('.finish_button');
  const deleteButton = item.querySelector('.delete_button');

  const deleteButtonHandler = () => {
    finishButton.removeEventListener('click', changeStatusHandler);
    deleteButton.removeEventListener('click', deleteButtonHandler);
    item.remove();
  };
  const changeStatusHandler = () => {
    if (finishButton.checked) {
      item.classList.add('finished_item');
    } else {
      item.classList.remove('finished_item');
    }
  };
  deleteButton.addEventListener('click', deleteButtonHandler);

  finishButton.addEventListener('change', changeStatusHandler);
}

const itemsToDo = Array.from(document.querySelectorAll('li'));

itemsToDo.forEach(item => {
  addButtonListener(item);
});
