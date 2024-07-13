// Load tasks from Local Storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to show toast notifications
function showToast(message, isError = false) {
  const toastElement = document.getElementById("liveToast");
  const toastBody = toastElement.querySelector(".toast-body");
  toastBody.textContent = message;
  toastElement.classList.remove("hide");
  toastElement.classList.add(isError ? "error" : "success");
  $('.toast').toast('show');
}

// Function to create a new task element
function newElement() {
  const taskInput = document.getElementById("task");
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    showToast("Listeye boş ekleme yapamazsınız!", true);
    return;
  }

  const task = createTaskElement(taskValue);
  document.getElementById("list").appendChild(task);
  taskInput.value = "";
  showToast("Listeye eklendi.");
  saveTasks();
}

// Function to create a task element
function createTaskElement(taskValue) {
  const li = document.createElement("li");
  li.textContent = taskValue;
  
  const span = document.createElement("span");
  span.textContent = " \u00D7";
  span.className = "close";
  span.onclick = function() {
    const li = this.parentElement;
    li.remove();
    showToast("Liste öğesi silindi.");
    saveTasks();
  };

  li.appendChild(span);
  li.onclick = function() {
    this.classList.toggle("checked");
    saveTasks();
  };

  return li;
}

// Function to save tasks to Local Storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#list li").forEach(li => {
    tasks.push({
      text: li.textContent.replace(" \u00D7", ""),
      checked: li.classList.contains("checked")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach(task => {
      const li = createTaskElement(task.text);
      if (task.checked) {
        li.classList.add("checked");
      }
      document.getElementById("list").appendChild(li);
    });
  }
}
