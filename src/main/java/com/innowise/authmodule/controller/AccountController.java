package com.innowise.authmodule.controller;

import com.innowise.authmodule.entity.RestError;
import com.innowise.authmodule.entity.User;
import com.innowise.authmodule.repository.RoleRepositoryImpl;
import com.innowise.authmodule.security.MySimpleUrlAuthenticationSuccessHandler;
import com.innowise.authmodule.service.UserServiceImpl;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.endpoint.TokenEndpoint;
import org.springframework.security.web.savedrequest.DefaultSavedRequest;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.security.auth.login.AccountException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AccountController  {

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

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

    @RequestMapping("/home")
    public String home() {
        return "You successfully loged in";
    }



}

