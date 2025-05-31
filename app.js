const { createApp } = Vue;

createApp({
  data() {
    return {
      newTask: "",
      tasks: [],
      currentTab: "todo-tab",
      showStartup: true,
      bootLines: [
        { text: "Initializing protocols...", visible: false },
        { text: "Loading BatIntel modules...", visible: false },
        { text: "Uplink to Batcave secured.", visible: false },
        { text: "Launching interface...", visible: false },
      ],
      timer: null,
      timeLeft: 25 * 60,
      isRunning: false,
    };
  },
  computed: {
    completedCount() {
      return this.tasks.filter(t => t.completed).length;
    },
    pendingCount() {
      return this.tasks.filter(t => !t.completed).length;
    },
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  },
  methods: {
    async bootSequence() {
      for (let i = 0; i < this.bootLines.length; i++) {
        this.bootLines[i].visible = true;
        await this.delay(1300);
      }
      this.showStartup = false;
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    addTask() {
      if (!this.newTask.trim()) {
        alert("Input invalid. The Batcomputer needs data.");
        return;
      }
      this.tasks.push({ text: this.newTask.trim(), completed: false });
      this.newTask = "";
    },
    editTask(index) {
      const updated = prompt("Update the objective, detective:", this.tasks[index].text);
      if (updated && updated.trim()) {
        this.tasks[index].text = updated.trim();
        this.tasks[index].completed = false;
      }
    },
    deleteTask(index) {
      if (confirm("Gotham doesn't forget. Are you sure?")) {
        this.tasks.splice(index, 1);
      }
    },
    updateCounters() {
    },
    startTimer() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.isRunning = false;
          alert("Patrol complete. Time to recharge.");
        }
      }, 1000);
    },
    pauseTimer() {
      clearInterval(this.timer);
      this.isRunning = false;
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timeLeft = 25 * 60;
      this.isRunning = false;
    }
  },
  mounted() {
    this.bootSequence();
  }
}).mount("#app");
