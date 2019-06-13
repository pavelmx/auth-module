package com.innowise.authmodule.service;

import com.innowise.authmodule.entity.User;
import javassist.NotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.security.auth.login.AccountException;

public interface UserService {

    UserDetails loadUserByUsername(String username);

    User findUserByUsername(String username);

    UserDetails loadUserByEmail(String username);

    User create(User user, String roleNames, String employeeId) throws AccountException, NotFoundException;

    User update(Long employeeId, Long idUser);

    void createPasswordResetTokenForUser(User user, String token);

    void updatePassword(String password, Long userId);

    String forgotPassword(String userEmail);

    String resetPassword(String password, String token);

}
