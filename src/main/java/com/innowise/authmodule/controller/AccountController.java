package com.innowise.authmodule.controller;

import com.innowise.authmodule.entity.RestError;
import com.innowise.authmodule.entity.User;
import com.innowise.authmodule.repository.RoleRepositoryImpl;
import com.innowise.authmodule.service.UserServiceImpl;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountException;
import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    UserServiceImpl userDetailsService;

    @Autowired
    RoleRepositoryImpl roleRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user, @RequestParam String roleNames) {
        try {
            return new ResponseEntity<>(userDetailsService.create(user, roleNames), HttpStatus.CREATED);
        } catch (AccountException e) {
            return new ResponseEntity<>(new RestError(e.getMessage()), HttpStatus.BAD_REQUEST);
        }catch (NotFoundException e) {
            return new ResponseEntity<>(new RestError(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cars")
    public List<String> getCars(){
        List<String> cars = new ArrayList<>();
        cars.add("BMW");cars.add("AUDI");cars.add("McLaren");
        cars.add("FERRARI");cars.add("VOLKSWAGEN");cars.add("LADA");
        cars.add("RENAULT");cars.add("CITROEN");cars.add("PEUGEOT");
        cars.add("LAMBORGINI");cars.add("BYGATTI");cars.add("MERCEDES-BENZ");
        return  cars;
    }

    @RequestMapping("/user")
    public Principal user(Principal user) {
        System.out.println("//////////////////////");
        return user;
    }

}

