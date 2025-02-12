// Fake Users Data
const users = [
  { id: 1, name: "John Doe", balance: 500 },
  { id: 2, name: "Jane Smith", balance: 1200 },
];

// Fake Transactions Data
const transactions = [
  { user: "John Doe", amount: "-$100", type: "Withdrawal" },
  { user: "Jane Smith", amount: "+$200", type: "Deposit" },
];

// Load Users in Admin Dashboard
function loadUsers() {
  const userTable = document.getElementById("userTable");
  users.forEach((user) => {
    let row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>$${user.balance}</td>
            <td><button onclick="deleteUser(${user.id})">Delete</button></td>
        </tr>`;
    userTable.innerHTML += row;
  });
}

// Load Transactions in Admin Dashboard
function loadTransactions() {
  const transactionList = document.getElementById("transactionList");
  transactions.forEach((transaction) => {
    let listItem = `<li>${transaction.user} - ${transaction.amount} (${transaction.type})</li>`;
    transactionList.innerHTML += listItem;
  });
}

// Delete User Function
function deleteUser(userId) {
  alert(`User with ID ${userId} deleted! (Implement API call here)`);
}

// Logout Admin
function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "admin-login.html";
}

// Load Data when Admin Dashboard Loads
document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
  loadTransactions();
});
