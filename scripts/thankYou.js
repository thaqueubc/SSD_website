
document.getElementById("myForm").addEventListener("submit", thankYou);

function thankYou() {
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value;
  alert("Thank you " + firstName + " " + lastName + " " + "for contacting us. We will get back to you soon");
}