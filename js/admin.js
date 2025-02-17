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

// Function to open payment modal
function openPaymentModal() {
  document.getElementById("paymentModal").classList.add("active");
  startTimer();
}
// Function to close payment modal
function closePaymentModal() {
  document.getElementById("paymentModal").classList.remove("active");
}
// Function to copy address
function copyAddress(elementId) {
  const address = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(address).then(() => {
    alert("Address copied to clipboard!");
  });
}
// Function to handle payment submission
function handlePaymentSubmit() {
  const paymentInfo = document.getElementById("paymentInfo").value;
  if (paymentInfo.trim() === "") {
    alert("Please enter payment information");
    return;
  }
  // Add your payment processing logic here
  alert("Payment submitted!");
  closePaymentModal();
}
// Timer functionality
function startTimer() {
  let timeLeft = 1800; // 30 minutes in seconds
  const timerElement = document.getElementById("paymentTimer");
  const timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      closePaymentModal();
      return;
    }
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}
// Clicking outside the modal closes it
document.getElementById("paymentModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closePaymentModal();
  }
});

const state = {
  balance: 0,
  totalDeposits: 0,
  activeInvestment: 0,
  earnings: 0,
  totalWithdrawals: 0,
};
function openDepositModal() {
  document.getElementById("depositModal").style.display = "block";
}
function closeDepositModal() {
  document.getElementById("depositModal").style.display = "none";
}
function validateDepositAmount() {
  const plan = document.getElementById("paymentMethod");
  const selectedOption = plan.options[plan.selectedIndex];
  const minDeposit = parseFloat(
    selectedOption.getAttribute("data-min-deposit")
  );
  const depositInput = document.getElementById("depositAmount");
  if (parseFloat(depositInput.value) < minDeposit) {
    depositInput.setCustomValidity(
      `Minimum deposit for this plan is $${minDeposit}`
    );
  } else {
    depositInput.setCustomValidity("");
  }
}
function handleDeposit() {
  const amount = parseFloat(
    document.getElementById("depositAmount").value || "0"
  );
  if (amount > 0) {
    document.getElementById(
      "depositAmountDisplay"
    ).textContent = `$${amount.toFixed(2)}`;
    state.balance += amount;
    state.totalDeposits += amount;
    updateBalance();
    closeDepositModal();
    openNewModal();
  }
}
function updateBalance() {
  document.getElementById("totalBalance").innerText = `$${state.balance.toFixed(
    2
  )}`;
  document.getElementById(
    "totalDeposits"
  ).innerText = `$${state.totalDeposits.toFixed(2)}`;
}
function openNewModal() {
  document.getElementById("newModal").style.display = "block";
}
function closeNewModal() {
  document.getElementById("newModal").style.display = "none";
}

function validateDepositAmount() {
  const selectedPlan =
    document.getElementById("paymentMethod").selectedOptions[0];
  const minDeposit = parseFloat(selectedPlan.getAttribute("data-min-deposit"));
  const depositAmountInput = document.getElementById("depositAmount");
  const depositAmount = parseFloat(depositAmountInput.value);
  if (depositAmount < minDeposit) {
    depositAmountInput.setCustomValidity(
      `Minimum deposit for this plan is $${minDeposit}`
    );
  } else {
    depositAmountInput.setCustomValidity("");
  }
}
document
  .getElementById("paymentMethod")
  .addEventListener("change", validateDepositAmount);



   // State management
 // Update UI functions
 function updateBalance() {
   document.getElementById(
     "totalBalance"
   ).textContent = `$${state.balance.toFixed(2)}`;
   document.getElementById(
     "activeInvestment"
   ).textContent = `$${state.activeInvestment.toFixed(2)}`;
   document.getElementById(
     "earnings"
   ).textContent = `$${state.earnings.toFixed(2)}`;
   document.getElementById(
     "totalDeposits"
   ).textContent = `$${state.totalDeposits.toFixed(2)}`;
   document.getElementById(
     "totalWithdrawals"
   ).textContent = `$${state.totalWithdrawals.toFixed(2)}`;
 }
 // function handleDeposit() {
 // const amount = parseFloat(prompt("Enter deposit amount:") || "0");
 // if (amount > 0) {
 // state.balance += amount;
 // state.totalDeposits += amount;
 // updateBalance();
 // }
 // }
 // function handleWithdraw() {
 // const amount = parseFloat(prompt("Enter withdrawal amount:") || "0");
 // if (amount > 0 && amount <= state.balance) {
 // state.balance -= amount;
 // state.totalWithdrawals += amount;
 // updateBalance();
 // }
 // }
 // Stock ticker
 function updateStockTicker() {
   const ticker = document.getElementById("stockTicker");
   ticker.innerHTML = state.stocks
     .map(
       (stock) => `
           <div class="stock">
               <span class="stock-symbol">${stock.symbol}</span>
               <span class="stock-price">$${stock.price.toFixed(2)}</span>
               <span class="stock-change ${
                 stock.change >= 0 ? "positive" : "negative"
               }">
                   ${stock.change >= 0 ? "↑" : "↓"}
                   ${Math.abs(stock.change).toFixed(2)} 
                   (${stock.changePercent.toFixed(2)}%)
               </span>
           </div>
       `
     )
     .join("");
 }
 // Chart
 let chart;
 function initChart() {
   const ctx = document.getElementById("analyticsChart").getContext("2d");
   const data = {
     labels: [],
     datasets: [
       {
         label: "Stock Price",
         data: [],
         borderColor: "#8884d8",
         tension: 0.1,
         fill: false,
       },
     ],
   };
   chart = new Chart(ctx, {
     type: "line",
     data: data,
     options: {
       responsive: true,
       maintainAspectRatio: false,
       plugins: {
         legend: {
           display: false,
         },
       },
       scales: {
         y: {
           beginAtZero: false,
         },
       },
     },
   });
 }
 // Fetch live stock data
 async function fetchStockData() {
   try {
     const response = await fetch(
       "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=YOUR_API_KE
     );
     const data = await response.json();
     if (data["Error Message"]) {
       throw new Error(data["Error Message"]);
     }
     const timeSeries = data["Time Series (5min)"];
     const chartData = Object.entries(timeSeries)
       .map(([time, values]) => ({
         time: time.split(" ")[1], // Extract only the time part
         price: parseFloat(values["4. close"]),
       }))
       .reverse()
       .slice(0, 20); // Get last 20 data points
     updateChart(chartData);
   } catch (error) {
     console.error("Error fetching stock data:", error);
   }
 }
 function updateChart(data) {
   chart.data.labels = data.map((item) => item.time);
   chart.data.datasets[0].data = data.map((item) => item.price);
   chart.update();
 }
 // Initialize
 document.addEventListener("DOMContentLoaded", () => {
   updateBalance();
   updateStockTicker();
   initChart();
   fetchStockData(); // Initial fetch
   setInterval(fetchStockData, 300000); // Fetch every 5 minutes
 });
 // Time range buttons
 document.querySelectorAll(".time-button").forEach((button) => {
   button.addEventListener("click", () => {
     document
       .querySelector(".time-button.active")
       .classList.remove("active");
     button.classList.add("active");
   });
 });