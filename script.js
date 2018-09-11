var button = document.getElementById('enter');
var input = document.getElementById('userInput');
var ul = document.querySelector('ul');

// Create an array of the already pre-existing list items on the page
var liCollection = document.querySelectorAll('li');

// Loop through each item in the list array and add a button and an event listener
// for completion
liCollection.forEach((listItem, index) => {
	listItem.innerHTML += ' <button class="delete">&times;</button>'
	listItem.addEventListener("click", finishTask)
})

// Create an array of of the buttons with a class of 'delete'
// on the page after the forEach loop runs
var delButonCollection = document.querySelectorAll('.delete')

// Loop through each item in the button array and add an event listener for deletion
delButonCollection.forEach((button, index) => {
	button.addEventListener("click", removeTask)
})

// Check the length of the input
function inputLength() {
	return input.value.length;
}

// Add the item to the list only if the input length is greater than 0 (based
// on add ListAfterClick and addListAfterKeyPress)
function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);
	input.value = ""

	// Add a button to the newly created list item
	li.innerHTML += ' <button class="delete">&times;</button>'

	// Add the item to the liCollection array
	liCollection = document.querySelectorAll('li');

	// Add the button to the delButtonCollection array
	delButonCollection = document.querySelectorAll('.delete')
	
	// Reload the collections with the appropriate
	// event listener (see function below)
	reloadCollections()
}

// Reload the collections with the appropriate event listener
function reloadCollections() {
	liCollection.forEach((listItem, index) => {
		listItem.addEventListener("click", finishTask)
	})

	delButonCollection.forEach((button, index) => {
		button.addEventListener("click", removeTask)
	})
}

function addListAfterClick() {
	if (inputLength() > 0 ) {
		createListElement()
	}
}

function addListAfterKeyPress(event) {
	if (inputLength() > 0 && event.keyCode == 13) {
		createListElement()
	}
}

// Remove the li and button elements on click
function removeTask() {
	this.parentNode.parentNode.removeChild(this.parentNode)
}

// Strikethrough or remove the strikethrough based on completing the task
// or needing to come back to it
function finishTask() {
	if (this.classList != 'done') {
		this.classList.add('done')		
	} else {
		this.classList.remove('done')
	}
}

button.addEventListener("click", addListAfterClick)

input.addEventListener("keypress", addListAfterKeyPress)