console.log("JS is sourced!");

//GET -> Read
function toDo() {
  // axios call to server
  //console.log('toDo is online!!!')
  axios({
    method: "GET",
    url: "/todos",
  })
     .then((response) => {
      // console.log("GET /toDo response.data", response.data);
       renderToDo(response.data);
     })
     .catch((error) => {
     // console.log("Error", error);
     });
} // end toDo

toDo()
//Rendering Function
function renderToDo(toDoList) {
  //console.log('todoList',toDoList)
  let locateTableBody = document.getElementById("toDoTable");
  toDoTable.innerHTML = ''; //sets to empty string
console.log(locateTableBody)
  for (let toDo of toDoList) { //Loop over each item and append data to the DOM
   // console.log(toDo)
    if (toDo.isComplete === true) {
      //console.log(toDo.isCompleted)
      toDoTable.innerHTML += `
                <tr data-testid="toDoItem"  class="completed">
                  <td>${toDo.text}</td>
                  <td>Complete</td>
                  <td><button onclick="completeTodo(${toDo.id})" data-testid="completeButton">Completed</button></td>
                  <td><button onclick="deleteTodo(${toDo.id})" data-testid="deleteButton">Delete</button></td>
                  </td>
                </tr>
              `;
    } else {
      toDoTable.innerHTML += `
            <tr data-testid="toDoItem">
                <td>${toDo.text}</td>
                <td>
                  <button onclick="completeTodo(${toDo.id})" data-testid="completeButton">Completed</button></td>
                <td>
                  <button onclick="deleteToDo(${toDo.id})" data-testid="deleteButton">Delete</button
                  </td>
            </tr>
                `;
    }
  }
}

// POST ->Create
function addToDo(){
let toDoText= document.getElementById("Input").value 
console.log(typeof(toDoText),"todoText")
let htmlElement = document.getElementById("Input")
console.log('todoText:', toDoText)
axios({
    method: 'POST',
    url: '/todos',
    data: {text: toDoText}
}).then((response) => {
    htmlElement.value = ''; //clear input values
    toDo(); 
}).catch((error) => {
    console.log('Error in POST route', error);
}); 
}
// PUT -> Update/Edit
function completeTodo (idToComplete) {
  axios({
    method: 'PUT',
    url: `/todos/${idToComplete}`
  })
  .then((response) => {
    // The update worked! Let's re-run getToDo to BRING THE
    // DOM BACK IN SYNC with our underlying table data:
    toDo();
  })
  .catch((error) => {
    console.log('update did not work. bummer dawg.', error);
  })
}

// DELETE -> Delete
function deleteToDo(idToDelete) {
  // Need to know the id of the task we want to delete!
  console.log('idToDelete is:', idToDelete);

  // Use axios to make an HTTP DELETE request to
  // `/todos/${idToDelete}`
  console.log(`/todos/${idToDelete}`)
  axios({
    method: 'DELETE',
    url: `/todos/${idToDelete}`
  })
    .then((response) => {
      // The delete worked! Let's re-run getToDo to BRING THE
      // DOM BACK IN SYNC with our underlying table data:
      toDo();
    })
    .catch((error) => {
      console.log('deleteTask did not work. bummer dawg.', error);
    })
}


// // 3. Each rendered to-do item must have:
// // * `data-testid="toDoItem"`
// // 4. Each to-do item's "delete" button must have:
// // * `data-testid="deleteButton"`
// // * This button must be a child of the element that has the `data-testid="toDoItem"` on it.
// // 5. Each to-do item's "mark complete" button must have:
// // * `data-testid="completeButton"`
// // * This button must be a child of the element that has the `data-testid="toDoItem"` on it.
// // 6. Each completed to-do item must have:
// // * A CSS class of `completed` applied to its `data-testid="toDoItem"` element.