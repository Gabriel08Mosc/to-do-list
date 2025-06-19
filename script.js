/** 
 * Dynamic list app with editable inputs, remove buttons,
    and persistent storage using localStorage
*/


//         DOM elements
const Addlist = document.querySelector(".addLi");
const UL = document.querySelector("ul");

//update localStorage whenever the input changes
function updateStorage() {
  const list = [];
  document.querySelectorAll("ul li input").forEach(input => {
    list.push(input.value.trim());
  });
  localStorage.setItem("to-do-list", JSON.stringify(list));
}

/**  
 *Creates a new list item (li) containing an editable input and a remove button.
  @param {string} value 
  -Optional initial value (used when loading from storage)
*/

function newElement(value = "") {
  const list = document.createElement("li"); //list item
  const input = document.createElement("input"); //text input
  const remove = document.createElement("button"); //button remove

  input.type = "text";
  input.placeholder = "Type here...";
  input.value = value.trim();
  input.classList.add("INPlist");

  remove.textContent = "remove";
  remove.classList.add("removeLi");

//this remove the entire list item on click and update localStorage
  remove.addEventListener("click", () => {
    list.remove();
    updateStorage();
  });

  // update localStorage, whenever you changes an input
  input.addEventListener("input", () => {
    updateStorage();
  });

  list.appendChild(input);
  list.appendChild(remove);
  UL.appendChild(list);
}

//create a new item list and update localStorage
Addlist.addEventListener("click", () => {
  newElement(); 
  updateStorage();
});

/**
 * Loads and displays the saved list from localStorage 
   when the page is loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("to-do-list")) || [];
  saved.forEach(val => {
    newElement(val);
  });
});
