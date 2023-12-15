  const app = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const emptyStateContainer = document.getElementById("appEmptyState");
    const mainContainer = document.getElementById("appMain");
    const addTaskModal = document.getElementById("addTaskModal");
    const addTaskButton = document.getElementById("addTaskBtn");
    const closeAddTaskModalButton = document.getElementById("modal-close");

    //  Get the three task containers
    const todoTaskContainer = document.getElementById("todoTaskContainer");
    const doingTaskContainer = document.getElementById("doingTaskContainer");
    const completedTaskContainer = document.getElementById(
      "completedTaskContainer"
    );

    // Get the three task number containers
    const todoNumber = document.getElementById("todoNumber");
    const doingNumber = document.getElementById("doingNumber");
    const completedNumber = document.getElementById("completedNumber");

    const renderTask = (task, container) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("board__task");

      const taskHeader = document.createElement("div");
      taskHeader.classList.add("board__task-header");

      const taskTitle = document.createElement("h3");
      taskTitle.classList.add("board__task-title");
      taskTitle.textContent = task.title;

      const taskActions = document.createElement("div");
      taskActions.classList.add("board__task-actions");

      const editTaskButton = document.createElement("button");
      editTaskButton.classList.add("board__task-btn");
      editTaskButton.id = "editTaskBtn";
      editTaskButton.textContent = "Edit";

      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("board__task-btn");
      deleteTaskButton.id = "deleteTaskBtn";
      deleteTaskButton.addEventListener("click", () => {
        const id = task.id;
        deleteTask(id);
      });
      deleteTaskButton.textContent = "Delete";

      taskActions.appendChild(editTaskButton);
      taskActions.appendChild(deleteTaskButton);

      taskHeader.appendChild(taskTitle);
      taskHeader.appendChild(taskActions);

      const taskDescription = document.createElement("p");
      taskDescription.classList.add("board__task-desc");
      taskDescription.textContent = task.description;

      taskElement.appendChild(taskHeader);
      taskElement.appendChild(taskDescription);

      container.appendChild(taskElement);
    };

    //  Break down tasks into three arrays based on status
    const renderTasks = () => {
      //  1. Filter tasks based on status
      //  2. Render tasks based on status
      const todoTasks = tasks.filter((task) => task.status === "todo");
      const doingTasks = tasks.filter((task) => task.status === "doing");
      const completedTasks = tasks.filter((task) => task.status === "completed");

      todoTaskContainer.innerHTML = "";
      doingTaskContainer.innerHTML = "";
      completedTaskContainer.innerHTML = "";

      todoNumber.textContent = todoTasks.length;
      doingNumber.textContent = doingTasks.length;
      completedNumber.textContent = completedTasks.length;

      todoTasks.forEach((task) => renderTask(task, todoTaskContainer));
      doingTasks.forEach((task) => renderTask(task, doingTaskContainer));
      completedTasks.forEach((task) => renderTask(task, completedTaskContainer));
    };

    const editTask = (id) => {
      console.log(id);
    };

    const deleteTask = (id) => {
      tasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      checkTasksExist();
    };

    const successAlert = document.getElementById("successAlert");
    const errorAlert = document.getElementById("errorAlert");

    errorAlert.classList.add("hidden");
    successAlert.classList.add("hidden");

    function checkTasksExist() {
      if (tasks.length > 0) {
        emptyStateContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
      } else {
        emptyStateContainer.classList.remove("hidden");
        mainContainer.classList.add("hidden");
      }
    }

    function openAddTaskModal() {
      addTaskModal.classList.remove("hidden");
    }

    function closeAddTaskModal() {
      addTaskModal.classList.add("hidden");
    }

    addTaskButton.addEventListener("click", openAddTaskModal);

    closeAddTaskModalButton.addEventListener("click", closeAddTaskModal);

    addTaskModal.classList.add("hidden");

    const RANDOMSTRINGS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const generateIDWithDateAndRandomString = () => {
      const date = new Date();
      const randomString = [...Array(10)].map(
        (i) => RANDOMSTRINGS[(Math.random() * RANDOMSTRINGS.length) | 0]
      ).join``;
      return `${date.getTime()}${randomString}`;
    };

    function addTask(title, description, status) {
      const task = {
        id: generateIDWithDateAndRandomString(),
        title,
        description,
        status,
      };

      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      showSuccess("Task added successfully");
      closeAddTaskModal();
      checkTasksExist();
    }

    const showSuccess = (message) => {
      successAlert.classList.remove("hidden");
      const alertMsg = document.querySelector(".alert__msg");
      alertMsg.textContent = message;
      setTimeout(() => successAlert.classList.add("hidden"), 1000);
    };

    const addTaskForm = document.getElementById("addTaskForm");

    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const status = document.getElementById("status").value;

      // check if title, description and status are not empty
      // if empty, show error message
      // else, add task

      function showError(message) {
        errorAlert.classList.remove("hidden");
        const alertMsg = document.querySelector(".alert__msg");
        alertMsg.textContent = message;
        setTimeout(() => errorAlert.classList.add("hidden"), 1000);
      }

      if (title === "") {
        showError("Title cannot be empty");
        return;
      }

      // if (description === "") {
      //   showError("Description cannot be empty");
      //   return;
      // }

      if (status === "") {
        showError("Status cannot be empty");
        return;
      }
      // console.log(title, description, status);
      addTask(title, description, status);

      // clear the form
      addTaskForm.reset();
    });

    renderTasks();
    checkTasksExist();
  };

  app();
