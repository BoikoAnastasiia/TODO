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
const modal = document.getElementById('modal');

addNewTodoButton.addEventListener('click', () => {
  const headlineTodo = headlineText.value || 'Title';
  const bodyTodo = todoBody.value;
  if (bodyTodo != '') {
    addNewToDo(headlineTodo, bodyTodo);
    headlineText.value = '';
    todoBody.value = '';
  } else {
    alert('Add some TODO text first');
  }
});

function addNewToDo(headline, todoText) {
  const newItem = document.createElement('li');
  newItem.innerHTML = `
    <h2>${headline}</h2>
    <p>${todoText}</p>
    <div class="edit_wrapper">
      <label class="test">
          <input type="checkbox" class="finish_button">
          <span></span>
        </label>
        <button type="button" class="edit_button">&#9998;</button>
      <button type="button" class="delete_button">
          &#8212;
        </button>
    </div>
    <p class="date"> ${addDate()} </p>
  `;
  todoList.appendChild(newItem);
  addButtonListener(newItem);
}

const addDate = () => {
  const date = Date.now();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

function addButtonListener(item) {
  const doneButton = item.querySelector('.finish_button');
  const deleteButton = item.querySelector('.delete_button');
  const editButton = item.querySelector('.editbutton');

  const deleteButtonHandler = () => {
    doneButton.removeEventListener('click', changeStatusHandler);
    deleteButton.removeEventListener('click', deleteButtonHandler);
    item.remove();
  };

  const editButtonHandler = () => {
    modal.style.display = block;
  };

  const changeStatusHandler = () => {
    if (doneButton.checked) {
      item.classList.add('finished_item');
    } else {
      item.classList.remove('finished_item');
    }
  };
  deleteButton.addEventListener('click', deleteButtonHandler);

  editButton.addEventListener('click', editButtonHandler);

  doneButton.addEventListener('change', changeStatusHandler);
}

const itemsToDo = Array.from(document.querySelectorAll('li'));

itemsToDo.forEach(item => {
  addButtonListener(item);
});
