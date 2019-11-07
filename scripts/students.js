var url = "/sheets/student-list.xlsx";
var students = {};

/* set up async GET request */
var req = new XMLHttpRequest();
req.open("GET", url, true);
req.responseType = "arraybuffer";

req.onload = function(e) {
  var data = new Uint8Array(req.response);
  var workbook = XLSX.read(data, {type:"array"});

  /* DO SOMETHING WITH workbook HERE */
  var studentSheetName = workbook.SheetNames[0];

  /* Get worksheet */
  var studentSheet = workbook.Sheets[studentSheetName];
  students = XLSX.utils.sheet_to_json(studentSheet);

}

req.send();

var studentTable = document.querySelector('.student-table');

for(let i = 0; i < students.length; i++) {
  // Create the full name td
  let nameTd = document.createElement('td');
  let fullName = students[i]["First Name"] + " " + students[i]["Last Name"];
  let fullNameText = document.createTextNode(fullName);
  nameTd.appendChild(fullNameText);

  // Create the contact td
  let contactTd = document.createElement('td');
  let email = students[i]["Email"];
  let emailText = document.createTextNode(email);
  contactTd.appendChild(emailText);

  // Create tr and append td, then append to the student table
  let tr = document.createElement('tr');
  tr.appendChild(nameTd);
  tr.appendChild(contactTd);
  studentTable.appendChild(tr);
}
