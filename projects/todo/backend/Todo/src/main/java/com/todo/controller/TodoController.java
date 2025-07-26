package com.todo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.todo.TodoApplication;
import com.todo.dto.TodoDTO;
import com.todo.entity.Todo;
import com.todo.service.TodoService;
import com.todo.utils.Message;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoApplication todoApplication;

	private TodoService todoService;

	public TodoController(TodoService todoService, TodoApplication todoApplication) {
		this.todoService = todoService;
		this.todoApplication = todoApplication;
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<?> getTodo(@PathVariable Integer id) {
		return todoService.getTodo(id);
	}

	@GetMapping("/getall")
	public List<Todo> getAllTodo() {
		return todoService.getAllTodos();
	}

	@PostMapping("/save")
	public ResponseEntity<Message> saveTodo(@RequestBody TodoDTO todoDTO) {
		return todoService.addTodo(todoDTO);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateTodo(@PathVariable Integer id, @RequestBody TodoDTO todoDTO) {
		return todoService.updateTodo(id, todoDTO);
	}

	@PutMapping("/updateCheck/{id}")
	public ResponseEntity<Message> updateTodoCheck(@PathVariable Integer id) {
		return todoService.updateTodoCheck(id);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteTodo(@PathVariable Integer id) {
		return todoService.deleteTodo(id);
	}
}
