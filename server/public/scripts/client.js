console.log("JS is sourced!");

//GET -> Read
function toDo() {
  // axios call to server
  axios({
    method: "GET",
    url: "/toDo",
  })
    .then((response) => {
      console.log("GET /toDo response.data", response.data);
      renderToDo(response.data);
    })
    .catch((error) => {
      console.log("Error", error);
    });
} // end toDo


//Rendering Function
function renderToDo(toDoList) {
  let toDoList = response.data;
  let locateTableBody = document.getElementById("toDoTable");
  locateTableBody.innerHTML = "";

  for (let toDo of toDoList) { //Loop over each item and append data to the DOM
    if (toDo.complete === true) {
      toDoTableBody.innerHTML += `
                <tr id="completed" data-testid="toDoItem">
                  <td>${toDo.text}</td>
                  <td>${toDo.completed}</td>
                    <button onclick="completeTodo(${toDo.id})" data-testid="completeButton">Completed</button>
                    <button onclick="deleteTodo(${toDo.id})" data-testid="deleteButton">Delete</button>
                  </td>
                </tr>
              `;
    } else {
      toDoTableBody.innerHTML += `
                <tr data-testid="toDoItem">
                <td>${toDo.text}</td>
                <td><button onclick="completeTodo(${toDo.id})" data-testid="completeButton">Completed</button></td>
                <td><button onclick="deleteToDo(${toDo.id})" data-testid="deleteButton">Delete</button></td>
            </tr>
                `;
    }
  }
}

// POST ->Create
function addToDo(){
let toDoText= document.getElementById("Input").value
console.log('todoText:', toDoText)
axios({
    method: 'POST',
    url: '/todos',
    data: {text: toDoText}
}).then((response) => {
    toDoText= ''; 
    fetchAndRenderToDo(); 
}).catch((error) => {
    console.log('Error in POST route', error);
}); 
}
// PUT -> Update/Edit
// DELETE -> Delete


// 3. Each rendered to-do item must have:
// * `data-testid="toDoItem"`
// 4. Each to-do item's "delete" button must have:
// * `data-testid="deleteButton"`
// * This button must be a child of the element that has the `data-testid="toDoItem"` on it.
// 5. Each to-do item's "mark complete" button must have:
// * `data-testid="completeButton"`
// * This button must be a child of the element that has the `data-testid="toDoItem"` on it.
// 6. Each completed to-do item must have:
// * A CSS class of `completed` applied to its `data-testid="toDoItem"` element.