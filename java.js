var todoArray = [], selectedIndex = -1;

    function getSavedTodoItems(){
        const todoItems = localStorage.getItem('todoList');
        todoArray = JSON.parse(todoItems) || [];
        displayTodoItems();
    }

    getSavedTodoItems();

    function addTodoItem(){
        const todoInput = document.getElementById("todo-input");
        if(selectedIndex >= 0){
            todoArray[selectedIndex].text = todoInput.value;
            selectedIndex = -1;
            document.getElementById("todo-add-btn").innerHTML = 'Add';
            document.getElementById("todo-add-btn").classList.remove('edit');
        }else{
            todoArray.push({ text: todoInput.value, isDone: false});
        }
        
        todoInput.value = '';
        displayTodoItems();
        saveTodoItems();
    }

    function saveTodoItems(){
        const todoItems = JSON.stringify(todoArray)
        localStorage.setItem('todoList',todoItems);
    }

    function displayTodoItems(){
        document.getElementById("todo-list").innerHTML = '';
        todoArray.forEach((item,index)=>{
            appendTodoItem(item,index)
        });

        if(!todoArray.length){
            document.getElementById("todo-list").innerHTML = '<p class="no-todo-items"> No todo Items </p>'
        }
    }

    function appendTodoItem(item,index){
        const todoList = document.getElementById("todo-list");
        const todoItem = document.createElement("li");
        todoItem.setAttribute('class','todo-item');

        if(item.isDone){
            todoItem.classList.add('done');
        }

        const todoText = '<span class="todo-text">' + item.text + '</span>' 
        const EditButton = '<i class="fa fa-pencil-square-o" onclick="editItem( ' + index + ' )"></i>' 
        const removeButton = '<i class="fa fa-remove" onclick="removeItem( ' + index + ' )"></i>' 
        const doneButton = '<i class="fa fa-check" onclick="markAsDone( ' + index + ' )"></i>' 
        todoItem.innerHTML = todoText + EditButton + removeButton + doneButton;
        todoList.appendChild(todoItem);
    }

    function removeItem(index){
        todoArray.splice(index,1);
        displayTodoItems();
        saveTodoItems();
    }

    function markAsDone(index){
        todoArray[index].isDone = !todoArray[index].isDone;
        displayTodoItems();
        saveTodoItems();
    }

    function editItem(index){
        selectedIndex = index;
        console.log('==selectedIndex==',selectedIndex);
        document.getElementById("todo-input").value = todoArray[index].text;
        document.getElementById("todo-add-btn").innerHTML = 'Edit';
        document.getElementById("todo-add-btn").classList.add('edit');
    }