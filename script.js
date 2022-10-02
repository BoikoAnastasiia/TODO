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
const modal = document.getElementById('modal_wrapper');
const form = document.getElementById('modal');

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
  newItem.id = Math.floor(Math.random() * 100) + Date.now();
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

  let todosInLs =
    localStorage.getItem('todoList') == null
      ? []
      : JSON.parse.localStorage.getItem('todoList');
  const todo = `{id: ${newItem.id}, headline: ${headline}, todoText: ${todoText}}`;
  todosInLs.push(todo);
  localStorage.setItem('todoList', JSON.stringify(todosInLs));
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
  const editButton = item.querySelector('.edit_button');

  const deleteButtonHandler = () => {
    doneButton.removeEventListener('click', changeStatusHandler);
    deleteButton.removeEventListener('click', deleteButtonHandler);
    item.remove();
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

const hideModal = e => {
  if (
    e.currentTarget == modal ||
    e.currentTarget == document.getElementById('close')
  ) {
    modal.style.display = 'none';
  }
  console.log(e.currentTarget);
};

modal.addEventListener('click', hideModal);

const editButtonHandler = () => {
  modal.style.display = 'block';
};

const handleSubmit = event => {
  const TODOHeadline = item.querySelector('h2');
  const TODOText = item.querySelector('p');
  const editHeadline = document.getElementById('edit_title');
  const editText = document.getElementById('edit_todo');
  editHeadline.value = TODOHeadline.innerHTML;
  editText.value = TODOText.textContent;
  event.preventDefault();

  const {
    elements: { editTitle, editTodoText }
  } = event.currentTarget;

  TODOHeadline.innerHTML = editTitle.value;
  TODOText.textContent = editTodoText.value;
  modal.style.display = 'none';
  event.currentTarget.reset();
};

form.addEventListener('submit', handleSubmit);

const itemsToDo = Array.from(document.querySelectorAll('li'));

itemsToDo.forEach(item => {
  addButtonListener(item);
});
