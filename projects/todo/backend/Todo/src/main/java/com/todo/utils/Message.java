package com.todo.utils;

import com.todo.entity.Todo;

public class Message {
	private String message;

	private Todo todo;

	public Message(String message, Todo todo) {
		this.message = message;
		this.todo = todo;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Todo getTodo() {
		return todo;
	}

	public void setTodo(Todo todo) {
		this.todo = todo;
	}
}
