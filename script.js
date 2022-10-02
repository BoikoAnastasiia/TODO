const headlineText = document.getElementById('headline_text');
const todoBody = document.getElementById('todo_body');
const addNewTodoButton = document.getElementById('add_new_todo');
const todoList = document.getElementById('todo_list');
const modal = document.getElementById('modal_wrapper');
const form = document.getElementById('modal');
const itemsToDo = Array.from(document.querySelectorAll('li'));

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

  const buttonHandler = e => {
    if (e.target == deleteButton) {
      item.remove();
    }
    if (e.target == editButton) {
      modal.style.display = 'block';

      form.dataset.id = item.id;
      const li = document.getElementById(`${form.dataset.id}`);
      const TODOHeadline = li.querySelector('h2');
      const TODOText = li.querySelector('p');
      const editHeadlineInput = document.getElementById('edit_title');
      const editTextInput = document.getElementById('edit_todo');
      editHeadlineInput.value = TODOHeadline.innerHTML;
      editTextInput.value = TODOText.innerHTML;
    }
  };

  const changeStatusHandler = () => {
    if (doneButton.checked) {
      item.classList.add('finished_item');
    } else {
      item.classList.remove('finished_item');
    }
  };

  item.addEventListener('click', buttonHandler);
  doneButton.addEventListener('change', changeStatusHandler);
}

const hideModal = e => {
  if (e.target == modal || e.target == document.getElementById('close')) {
    modal.style.display = 'none';
  }
};

modal.addEventListener('click', hideModal);

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { editTitle, editTodoText }
  } = event.currentTarget;
  const li = document.getElementById(`${form.dataset.id}`);
  const TODOHeadline = li.querySelector('h2');
  const TODOText = li.querySelector('p');
  TODOHeadline.innerHTML = editTitle.value;
  TODOText.innerHTML = editTodoText.value;

  modal.style.display = 'none';
  event.currentTarget.reset();
};

form.addEventListener('submit', handleSubmit);

itemsToDo.forEach(item => {
  addButtonListener(item);
});
