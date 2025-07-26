package com.todo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.todo.dto.TodoDTO;
import com.todo.entity.Todo;
import com.todo.utils.Message;

public interface TodoService {

	ResponseEntity<Message> addTodo(TodoDTO todoDTO);

	ResponseEntity<?> getTodo(Integer id);

	ResponseEntity<?> updateTodo(Integer id, TodoDTO todoDTO);

	ResponseEntity<?> deleteTodo(Integer id);

	List<Todo> getAllTodos();
	
	ResponseEntity<Message> updateTodoCheck(Integer id);

}
