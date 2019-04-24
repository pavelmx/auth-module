package com.innowise.authmodule.service;

import com.innowise.authmodule.entity.User;
import javassist.NotFoundException;
import org.springframework.security.core.userdetails.UserDetails;

import javax.security.auth.login.AccountException;
import java.util.List;

public interface UserService {

    UserDetails loadUserByUsername(String username);

    User create(User user, String roleNames) throws AccountException, NotFoundException;
}
