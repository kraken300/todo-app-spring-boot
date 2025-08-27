package com.todo.exception;

import com.todo.utils.ErrorMsg;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(TodoNotFound.class)
    public ResponseEntity<ErrorMsg> handleTodoNotFound(TodoNotFound todoNotFound) {
        ErrorMsg errorMessage = new ErrorMsg(todoNotFound.getMessage());
        return new ResponseEntity<ErrorMsg>(errorMessage, HttpStatus.NOT_FOUND);
    }

}
