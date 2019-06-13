package com.innowise.authmodule.service;

import com.innowise.authmodule.entity.PasswordResetToken;
import com.innowise.authmodule.entity.Role;
import com.innowise.authmodule.entity.User;
import com.innowise.authmodule.repository.PasswordTokenRepository;
import com.innowise.authmodule.repository.RoleRepositoryImpl;
import com.innowise.authmodule.repository.UserRepositoryImpl;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.security.auth.login.AccountException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {


    @Autowired
    private UserRepositoryImpl userRepo;

    @Autowired
    private RoleRepositoryImpl roleRepo;

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailServiceImpl mailSender;


    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User with username: '" + username + "' not found."));
        return user;
    }

    @Override
    public User findUserByUsername(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User with username: '" + username + "' not found."));
        return user;
    }

    @Override
    public UserDetails loadUserByEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email: '" + email + "' not found."));
        return user;
    }

    @Override
    public User create(User user, String roleNames, String employeeId) throws AccountException, NotFoundException {
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new AccountException("Username '" + user.getUsername() + "' already exists");
        }
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new AccountException("Email '" + user.getEmail() + "' is already taken");
        }
        Set<Role> roles = new HashSet<>();
        /*for (String role: roleNames) {
            roles.add(roleRepo.findByName(role)
                    .orElseThrow(() -> new NotFoundException("Role with name '" + role + "' not found")));
        }*/
        roles.add(roleRepo.findByName(roleNames).get());
        user.setRoles(roles);
        if (employeeId != "") user.setEmployeeId(Long.valueOf(employeeId));
        else user.setEmployeeId(null);
        user.setCreated(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return user;
    }

    @Override
    public User update(Long employeeId, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with id: '" + userId + "' not found"));
        if (employeeId == 0) {
            user.setEmployeeId(null);
        }else{
            user.setEmployeeId(employeeId);
        }
        return userRepo.save(user);
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, user, 1);
        passwordTokenRepository.save(myToken);
    }

    @Override
    @Transactional
    public void updatePassword(String password, Long userId) {
        String updatedPassword = passwordEncoder.encode(password);
        userRepo.updatePassword(updatedPassword, userId);
    }

    @Override
    public String forgotPassword(String email) {
        User user = (User) loadUserByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException();
        }
        String token = UUID.randomUUID().toString();
        createPasswordResetTokenForUser(user, token);
        String toEmail = user.getEmail();
        String fromEmail = "hr@innowise.group";
        String subject = "Password reset request";
        String message = "This link is active for one hour. \n" +
                "http://localhost:8080#reset-password?token=" + token;
        mailSender.sendEmail(toEmail, fromEmail, subject, message);
        return "Reset link send to your email";
    }

    @Override
    @Transactional
    public String resetPassword(String password, String token) {
        PasswordResetToken resetToken = passwordTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Could not find reset token"));
        User user = resetToken.getUser();
        updatePassword(password, user.getId());
        passwordTokenRepository.deleteById(resetToken.getId());
        return "Reset password success";
    }
}