package com.todo.service;

import java.util.List;
import java.util.Optional;

import com.todo.dao.TodoDAO;
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

    private final TodoDAO todoDAO;

    public TodoServiceImpl(TodoDAO todoDAO) {
        this.todoDAO = todoDAO;
    }

    @Override
    public ResponseEntity<Message> addTodo(TodoDTO todoDTO) {
        Todo todo = new Todo();
        BeanUtils.copyProperties(todoDTO, todo);
        Todo saveTodo = todoDAO.save(todo);

        Message saveMessage = new Message("Todo saved successfully!", saveTodo);
        return new ResponseEntity<Message>(saveMessage, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> getTodo(Integer id) {
        Todo todo = todoDAO.findById(id);
        Message foundMessage = new Message("Todo found!", todo);
        return new ResponseEntity<Message>(foundMessage, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateTodo(Integer id, TodoDTO newTodoDTO) {
        Todo oldTodo = todoDAO.findById(id);

        if (oldTodo.getTitle() != null) {
            oldTodo.setTitle(newTodoDTO.getTitle());
        }
        if (oldTodo.getContent() != null) {
            oldTodo.setContent(newTodoDTO.getContent());
        }
        oldTodo.setIsCompleted(newTodoDTO.getIsCompleted());

        Todo updatedTodo = todoDAO.save(oldTodo);
        Message updateMessage = new Message("Todo updated successfully!", updatedTodo);
        return new ResponseEntity<Message>(updateMessage, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<?> deleteTodo(Integer id) {
        Todo todo = todoDAO.findById(id);
        todoDAO.deleteTodo(todo);
        Message deleteMessage = new Message("Todo deleted successfully!", null);
        return new ResponseEntity<Message>(deleteMessage, HttpStatus.OK);
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoDAO.findAllTodos();
    }

    @Override
    public ResponseEntity<Message> updateTodoCheck(Integer id) {
        Todo todo = todoDAO.findById(id);
        todo.setIsCompleted(!todo.getIsCompleted());
        Todo updated = todoDAO.save(todo);

        Message updatedMessage = new Message("Todo checked", updated);
        return new ResponseEntity<Message>(updatedMessage, HttpStatus.OK);
    }

}
