package com.todo.exception;

public class TodoNotFound extends RuntimeException {
    private final String message;

    public TodoNotFound(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
