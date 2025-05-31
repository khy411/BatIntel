const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list-container"); 
const completedCounter = document.getElementById("completed-count");
const pendingCounter = document.getElementById("pending-count");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const pendingTasks = document.querySelectorAll("li:not(.completed)").length;
    completedCounter.textContent = completedTasks;
    pendingCounter.textContent = pendingTasks;
}

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
    updateCounters();

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

    document.getElementById("app").style.display = 'block';
  };

function switchTab(tabId) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.style.display = "none");
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = "block";
    }
}

// pomodoro timer functionality
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById("timer-display");

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert("Patrol complete. Time to recharge.");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;  
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60; // reset to 25 minutes
    isRunning = false;  
    updateTimerDisplay();
}

window.addEventListener('load', () => {
    updateTimerDisplay();
    bootSequence();
});
