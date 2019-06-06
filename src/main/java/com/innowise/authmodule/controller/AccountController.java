package com.innowise.authmodule.controller;

import com.innowise.authmodule.entity.RestError;
import com.innowise.authmodule.entity.User;
import com.innowise.authmodule.service.UserService;
import com.innowise.authmodule.service.UserServiceImpl;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountException;
import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin(origins = "*")
public class AccountController  {

    @Autowired
    UserService userService;

     @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user, @RequestParam String roleNames) {
        try {
            return new ResponseEntity<>(userService.create(user, roleNames), HttpStatus.CREATED);
        } catch (AccountException e) {
            return new ResponseEntity<>(new RestError(e.getMessage()), HttpStatus.BAD_REQUEST);
        }catch (NotFoundException e) {
            return new ResponseEntity<>(new RestError(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping("/user/me")
    public Principal user(Principal user) {
        return user;
    }

    @RequestMapping("/home")
    public String home() {
        return "You successfully loged in";
    }



}

