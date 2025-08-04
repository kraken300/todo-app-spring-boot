package com.todo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.todo.dto.TodoDTO;
import com.todo.entity.Todo;
import com.todo.repository.TodoRepository;
import com.todo.utils.ErrorMsg;
import com.todo.utils.Message;

@Service
public class TodoServiceImpl implements TodoService {

	private TodoRepository todoRepository;

	public TodoServiceImpl(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	@Override
	public ResponseEntity<Message> addTodo(TodoDTO todoDTO) {

		Todo todo = new Todo();

		BeanUtils.copyProperties(todoDTO, todo);

		Todo saveTodo = todoRepository.save(todo);

		Message saveMessage = new Message("Todo saved successfully!", saveTodo);
		return new ResponseEntity<Message>(saveMessage, HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> getTodo(Integer id) {
		Optional<Todo> optTodo = todoRepository.findById(id);

		ResponseEntity<?> rs = null;

		if (optTodo.isPresent()) {
			Message foundMessage = new Message("Todo found!", optTodo.get());
			rs = new ResponseEntity<Message>(foundMessage, HttpStatus.OK);
		} else {

			ErrorMsg errorMessage = new ErrorMsg("Todo not found!");
			rs = new ResponseEntity<ErrorMsg>(errorMessage, HttpStatus.NOT_FOUND);
		}
		return rs;

	}

	// TODO : Might need to change the logic (no need to add error part)
	@Override
	public ResponseEntity<?> updateTodo(Integer id, TodoDTO newTodoDTO) {
		Optional<Todo> optTodo = todoRepository.findById(id);

		ResponseEntity<?> rs = null;

		if (optTodo.isPresent()) {
			Todo oldTodo = optTodo.get();
//			oldTodo.setTitle(newTodoDTO.getTitle());
//			oldTodo.setContent(newTodoDTO.getContent());
//			oldTodo.setIsCompleted(newTodoDTO.getIsCompleted());

			BeanUtils.copyProperties(newTodoDTO, oldTodo);

			Todo updatedTodo = todoRepository.save(oldTodo);
			Message updateMessage = new Message("Todo updated successfully!", updatedTodo);
			rs = new ResponseEntity<Message>(updateMessage, HttpStatus.OK);
		} else {
			ErrorMsg errorMessage = new ErrorMsg("Todo not found!");
			rs = new ResponseEntity<ErrorMsg>(errorMessage, HttpStatus.NOT_FOUND);
		}
		return rs;
	}

	@Override
	public ResponseEntity<?> deleteTodo(Integer id) {
		Optional<Todo> optTodo = todoRepository.findById(id);

		ResponseEntity<?> rs = null;

		if (optTodo.isPresent()) {
			todoRepository.delete(optTodo.get());
			Message deleteMessage = new Message("Todo deleted successfully!", null);
			rs = new ResponseEntity<Message>(deleteMessage, HttpStatus.OK);
		} else {
			ErrorMsg errorMsg = new ErrorMsg("Todo not found!");
			rs = new ResponseEntity<ErrorMsg>(errorMsg, HttpStatus.NOT_FOUND);
		}
		return rs;
	}

	@Override
	public List<Todo> getAllTodos() {
		List<Todo> todos = todoRepository.findAll();
		return todos;
	}

	@Override
	public ResponseEntity<Message> updateTodoCheck(Integer id) {
		Optional<Todo> optTodo = todoRepository.findById(id);

		Todo todo = optTodo.get();
		todo.setIsCompleted(!todo.getIsCompleted());
		Todo updated = todoRepository.save(todo);

		Message updatedMessage = new Message("Todo checked", updated);
		return new ResponseEntity<Message>(updatedMessage, HttpStatus.OK);
	}

}
