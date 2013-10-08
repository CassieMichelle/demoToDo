var add_item_el;
var new_task_field_el;
var todo_items_el;
var completed_items_el;
var tasks_array = [];
window.onload = function(){
	add_item_el = document.getElementById('add-item');
	new_task_field_el = document.getElementById('new-task-field');
	todo_items_el = document.getElementById('todo-items');
	completed_items_el = document.getElementById('completed-items')
	add_item_el.addEventListener('click', toDoApp.createTask);
	if (localStorage.getItem('tasks')){
		toDoApp.load();
	}
}


var toDoApp = {
	  createTask: function() {
	  	var name = new_task_field_el.value;
	  	var task = new toDo()
	  	task.setTaskText(name);
	  	console.log(task.name);
	  	toDoApp.appendTask(task);
	  }, 
	  appendTask: function(task) {
	  	if (task.name.length > 0){
	  		toDoApp.render(task);
	  		tasks_array.push(task);
	  		tasks_array_to_json = JSON.stringify(tasks_array);
	  		localStorage.setItem('tasks', tasks_array_to_json);
	  		console.log(tasks_array);
	  	}
	  }, 
	  render: function(task) {
	  	var new_todo = document.createElement('li');
	  	var new_todo_div = document.createElement('div')
	  	new_todo_div.appendChild(document.createTextNode(task.name));
	  	new_todo_div.appendChild(task.completedButton());
	  	new_todo_div.appendChild(task.deleteButton());
	  	new_todo.appendChild(new_todo_div);
	  	todo_items_el.appendChild(new_todo);
	  },
	  renderComplete: function(task) {
	  	task.completed_on = new Date();
	  	var i = tasks_array.indexOf(task);
	  	if (i > -1) {
	  		tasks_array[i] = task;
	  	}
	  	var tasks_array_to_json = JSON.stringify(tasks_array);
			localStorage.setItem('tasks', tasks_array_to_json);

			var new_todo = document.createElement('li');
	  	var new_todo_div = document.createElement('div')
	  	new_todo_div.appendChild(document.createTextNode(task.name));
	  	new_todo_div.appendChild(task.deleteButton());

	  	new_todo.appendChild(new_todo_div);
	  	completed_items_el.appendChild(new_todo);

	  },
	  load: function() {
	  	var tasks = JSON.parse(localStorage.getItem('tasks'));
	  	for (task in tasks){
	  		todo = new toDo(tasks[task].name, tasks[task].created_on, tasks[task].completed_on);
	  		tasks_array.push(todo)
	  	}
	  	for (todo in tasks_array) {
	  		if (tasks_array[todo].completed_on){
	  			toDoApp.renderComplete(tasks_array[todo]);
	  		} else {
	  			toDoApp.render(tasks_array[todo]);
	  		}
	  	}



	  	// 	if (task.completed_on){
	  	// 		//make new completed task item

	  	// 	} else {
	  	// 		toDoApp.render(task);
	  	// 	}
	  	// } 

	  }

}

var toDo = function(name, created_on, completed_on) {
	this.name = name;
	this.created_on = new Date();
	this.completed_on = completed_on;
}

toDo.prototype = {
	setTaskText: function(name) {
		this.name = name;
	}, 
	completedButton: function() {
		console.log(tasks_array);
		var todo = this;
		var button = document.createElement("button");
		var text = document.createTextNode("Completed");
		button.appendChild(text);

		button.addEventListener('click', function(){
			toDoApp.renderComplete(todo);

      var li = this.parentNode.parentNode;
      this.parentNode.parentNode.parentNode.removeChild(li);

		});
		console.log("Tasks Array"+tasks_array);
		return button;
	}, 
	deleteButton: function() {
		var todo = this;
		var button = document.createElement("button");
		var text = document.createTextNode("Delete");
		button.appendChild(text);

		button.addEventListener('click', function(){
			var li = this.parentNode.parentNode;
			this.parentNode.parentNode.parentNode.removeChild(li);
			var i = tasks_array.indexOf(todo);
			if (i > -1) {
				tasks_array.splice(i, 1);
				var tasks_array_to_json = JSON.stringify(tasks_array);
				localStorage.setItem('tasks', tasks_array_to_json);
			}
		});
		return button;
	}

	
} 

