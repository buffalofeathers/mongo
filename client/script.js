$(document).ready(function() {
    $todoList = $('#todo-list');

    function addTodo(todo) {
        //Create a representation of a todo
        $todoItem = $('<div class="todo-item"></div>');
        $('<h1></h1>').text(todo.description).appendTo($todoItem);
        $checkbox = $('<label><input type="checkbox" disabled>Completed</label>');
        if(todo.completed) {
            $checkbox.children().first().attr('checked', true);
        }
        $todoItem.append($checkbox);
        $todoList.append($todoItem);
    }



function getTodos() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/todos'
    }).then(function(todos) {
        for (var i = 0; i < todos.length; i++) {
            addTodo(todos[i]);
        }
    }, function (err) {
        console.log(err);
    });
}
getTodos();

});