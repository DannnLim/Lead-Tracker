let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
// console.log(inputEl);
const btnClicked = document.getElementById("input-btn");
// console.log(btnClicked);
const ulel = document.getElementById("ul-el");
console.log(ulel);
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// localStorage.setItem("myLeads", "www.example.com");
// console.log(localStorage.getItem("myLeads"));
// localStorage.clear();

const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));
// console.log(Boolean(leadsFromStorage));

if (leadsFromStorage) {
  myLeads = leadsFromStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // listItems +=
    //   "<li><a target='_blank' href='" +
    //   myLeads[i] +
    //   "'>" +
    //   myLeads[i] +
    //   "</a></li>";
    listItems += `
    <li>
      <a target='_blank' href='${leads[i]}'> 
      ${leads[i]} 
     </a> 
    </li>`;
  }

  ulel.innerHTML = listItems;
  console.log(myLeads);
}

deleteBtn.addEventListener("dblclick", function () {
  // console.log("Delete button");
  localStorage.clear();
  myLeads = [];
  ulel.innerHTML = "";
  console.log("cleared");
});

console.log(leadsFromStorage);

btnClicked.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("Leads", JSON.stringify(myLeads));
  // localStorage.clear;
  render(myLeads);
});
