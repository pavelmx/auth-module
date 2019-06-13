package com.innowise.authmodule.controller;

import com.innowise.authmodule.entity.PasswordResetToken;
import com.innowise.authmodule.entity.RestError;
import com.innowise.authmodule.entity.User;
import com.innowise.authmodule.repository.PasswordTokenRepository;
import com.innowise.authmodule.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountException;
import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin(origins = "*")
public class AccountController  {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user, @RequestParam String roleNames, @RequestParam String employee_id) {
        try {
            return new ResponseEntity<>(userService.create(user, roleNames, employee_id), HttpStatus.CREATED);
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

    @GetMapping("/update-password/{id}")
    public ResponseEntity<?> updatePassword(@RequestParam String password, @PathVariable Long id){
        userService.updatePassword(password, id);
        return new ResponseEntity<>(new RestError("Password success updated"), HttpStatus.OK);
    }

    @GetMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email){
        System.out.println("---------------" + 1);
         String result = userService.forgotPassword(email);
         return new ResponseEntity<>(new RestError(result), HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String password,
                                           @RequestParam String token){
        System.out.println("---------------" + 3);
        PasswordResetToken resetToken = passwordTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Could not find reset token"));
        if (resetToken.isExpired()){
            return new ResponseEntity<>(new RestError("Token has expired, please request a new password reset"), HttpStatus.BAD_REQUEST);
        }
        String result = userService.resetPassword(password, token);
        return new ResponseEntity<>(new RestError(result), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserByUsername(@RequestParam String username){
        return new ResponseEntity<>((User) userService.findUserByUsername(username), HttpStatus.OK);
    }

    ////test methods

    @RequestMapping("/public")
    public String publicR() {
        return "public";
    }

    @RequestMapping("/private")
    public String privateR() {
        return "private";
    }
}

