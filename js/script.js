document.getElementById("country").addEventListener("change", function () {
  const selectedOption = this.options[this.selectedIndex];
  const countryCode = selectedOption.getAttribute("data-code");
  document.getElementById("countryCode").innerText = countryCode;
});
