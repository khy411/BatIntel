const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list-container"); 
const completedCounter = document.getElementById("completed-count");
const pendingCounter = document.getElementById("pending-count");

function addTask() {
    const task = inputBox.value.trim();
    if (task === "") {
        alert("Input invalid. The Batcomputer needs data.");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = ""; // clear input after adding

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");
    const taskSpan = li.querySelector("span");

    // checkbox event listener
    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // edit button event listener
    editBtn.addEventListener("click", function() {
        const update = prompt("Update the objective, detective:", taskSpan.textContent);
        if (update !== null && update.trim() !== "") {
            taskSpan.textContent = update.trim();
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // delete button event listener
    deleteBtn.addEventListener("click", function() {
        if (confirm("Gotham doesn't forget. Are you sure?")) {
            li.style.transition = "opacity 0.3s ease";
            li.style.opacity = "0";
            setTimeout(() => {
                listContainer.removeChild(li);
                updateCounters();
            }, 300);
        }
    });
}

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const pendingTasks = document.querySelectorAll("li:not(.completed)").length;
    completedCounter.textContent = completedTasks;
    pendingCounter.textContent = pendingTasks;
}

window.addEventListener('load', () => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bootSequence = async () => {
    const lines = [
      document.getElementById("line1"),
      document.getElementById("line2"),
      document.getElementById("line3"),
      document.getElementById("line4")
    ];

    for (let i = 0; i < lines.length; i++) {
      lines[i].style.display = 'block';
      await delay(300);
      lines[i].style.opacity = '1';
      await delay(1000); // wait before showing next
    }

    // fade out the startup screen
    await delay(800);
    const screen = document.getElementById("startup-screen");
    screen.style.transition = "opacity 1s ease";
    screen.style.opacity = 0;

    await delay(1000);
    screen.style.display = 'none';
  };

  bootSequence();
});
