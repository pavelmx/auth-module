package com.innowise.authmodule.entity;

public class RestError {

    private String message;

    public RestError(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}