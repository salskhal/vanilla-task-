const getDOMElement = (id) => document.getElementById(id);

const app = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const emptyStateContainer = getDOMElement("appEmptyState");
  const mainContainer = getDOMElement("appMain");
  const addTaskModal = getDOMElement("addTaskModal");
  const addTaskButton = getDOMElement("addTaskBtn");
  const closeAddTaskModalButton = getDOMElement("modal-close");

  const todoTaskContainer = getDOMElement("todoTaskContainer");
  const doingTaskContainer = getDOMElement("inProgressTaskContainer");
  const completedTaskContainer = getDOMElement("doneTaskContainer");

  //   Break down tasks into three arrays based on status
  //   1. Filter tasks based on status
  //   2. Render tasks based on status

  const renderTasks = () => {
    const todoTasks = tasks.filter((task) => task.status === "todo");
    const doingTasks = tasks.filter((task) => task.status === "doing");
    const completedTasks = tasks.filter((task) => task.status === "completed");

    todoTaskContainer.innerHTML = "";
    doingTaskContainer.innerHTML = "";
    completedTaskContainer.innerHTML = "";

    todoTasks.forEach((task) => renderTask(task, todoTaskContainer));
    doingTasks.forEach((task) => renderTask(task, doingTaskContainer));
    completedTasks.forEach((task) => renderTask(task, completedTaskContainer));
  };



  const successAlert = getDOMElement("successAlert");
  const errorAlert = getDOMElement("errorAlert");

  errorAlert.classList.add("hidden");
  successAlert.classList.add("hidden");

  const showElement = (element) => element.classList.remove("hidden");
  const hideElement = (element) => element.classList.add("hidden");

  const checkTasksExist = () => {
    if (tasks.length > 0) {
      hideElement(emptyStateContainer);
      showElement(mainContainer);
    } else {
      showElement(emptyStateContainer);
      hideElement(mainContainer);
    }
  };

  const openAddTaskModal = () => addTaskModal.classList.remove("hidden");
  const closeAddTaskModal = () => addTaskModal.classList.add("hidden");

  addTaskButton.addEventListener("click", openAddTaskModal);
  closeAddTaskModalButton.addEventListener("click", closeAddTaskModal);
  addTaskModal.classList.add("hidden");

  const showSuccess = (message) => {
    showElement(successAlert);
    const alertMsg = getDOMElement(".alert__msg");
    alertMsg.textContent = message;
    setTimeout(() => hideElement(successAlert), 1000);
  };

  const showError = (message) => {
    showElement(errorAlert);
    const alertMsg = getDOMElement(".alert__msg");
    alertMsg.textContent = message;
    setTimeout(() => hideElement(errorAlert), 1000);
  };

  const addTaskForm = getDOMElement("addTaskForm");

  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = getDOMElement("title").value;
    const description = getDOMElement("description").value;
    const status = getDOMElement("status").value;

    if (!title || !description || !status) {
      showError("Title, description, and status cannot be empty");
      return;
    }

    addTask(title, description, status);
    addTaskForm.reset();
  });

  const addTask = (title, description, status) => {
    const task = {
      id: tasks.length + 1,
      title,
      description,
      status,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showSuccess("Task added successfully");
    closeAddTaskModal();
    checkTasksExist();
  };

  checkTasksExist();
};

app();
