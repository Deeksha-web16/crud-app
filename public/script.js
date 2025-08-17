const API_URL = "http://localhost:5000/users";

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, age })
  });

  document.getElementById("userForm").reset();
  loadUsers();
});

async function loadUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();

  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>
        <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', ${user.age})">Edit</button>
        <button onclick="deleteUser('${user._id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadUsers();
}

function editUser(id, name, email, age) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("age").value = age;

  document.getElementById("userForm").onsubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value
      })
    });
    document.getElementById("userForm").reset();
    document.getElementById("userForm").onsubmit = addUser;
    loadUsers();
  };
}

const addUser = document.getElementById("userForm").onsubmit;
loadUsers();
