package com.todo.dao;

import com.todo.entity.Todo;
import com.todo.exception.TodoNotFound;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TodoDAO {
    private final TodoRepository todoRepository;

    public TodoDAO(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo findById(Integer id) {
        return todoRepository.findById(id).orElseThrow(() -> new TodoNotFound("Todo not found!"));
    }

    public void deleteTodo(Todo todo) {
        todoRepository.delete(todo);
    }

    public List<Todo> findAllTodos() {
        return todoRepository.findAll();
    }
}
