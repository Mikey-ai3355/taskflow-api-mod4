// TaskFlow frontend — calls the deployed Render API.
//
// Set API_BASE to your deployed URL. If left as the default it points at
// https://taskflow-api-mod4.onrender.com/api/tasks.
const API_BASE = "https://taskflow-api-mod4.onrender.com/api/tasks";

const listEl = document.getElementById("task-list");
const emptyEl = document.getElementById("empty");
const errorEl = document.getElementById("error");
const inputEl = document.getElementById("new-title");
const addBtn = document.getElementById("add-btn");
document.getElementById("api-base").href = API_BASE;

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}
function clearError() {
  errorEl.hidden = true;
}

async function api(path, options) {
  const res = await fetch(API_BASE + path, options);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${body || res.statusText}`);
  }
  return res.status === 204 ? null : res.json();
}

function render(tasks) {
  listEl.innerHTML = "";
  emptyEl.hidden = tasks.length > 0;
  for (const t of tasks) {
    const li = document.createElement("li");
    li.className = "task" + (t.completed ? " done" : "");

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = t.title;

    const actions = document.createElement("div");
    actions.className = "actions";

    const toggle = document.createElement("button");
    toggle.className = "toggle";
    toggle.textContent = t.completed ? "Reopen" : "Complete";
    toggle.onclick = async () => {
      await api(`/${t.id}/complete`, { method: "PUT" });
      refresh();
    };

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "Delete";
    del.onclick = async () => {
      await api(`/${t.id}`, { method: "DELETE" });
      refresh();
    };

    actions.append(toggle, del);
    li.append(title, actions);
    listEl.append(li);
  }
}

async function refresh() {
  try {
    clearError();
    const tasks = await api("");
    render(tasks);
  } catch (e) {
    showError(e.message);
  }
}

async function addTask() {
  const title = inputEl.value.trim();
  if (!title) return;
  try {
    clearError();
    addBtn.disabled = true;
    await api("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    inputEl.value = "";
    refresh();
  } catch (e) {
    showError(e.message);
  } finally {
    addBtn.disabled = false;
  }
}

addBtn.addEventListener("click", addTask);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

refresh();
