package com.todo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.todo.entity.Todo;
import com.todo.utils.Message;

public interface TodoService {

	ResponseEntity<Message> addTodo(Todo todo);

	ResponseEntity<?> getTodo(Integer id);

	ResponseEntity<?> updateTodo(Integer id, Todo todo);

	ResponseEntity<?> deleteTodo(Integer id);

	List<Todo> getAllTodos();
	
	ResponseEntity<Message> updateTodoCheck(Integer id);

}
