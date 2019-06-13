package com.innowise.authmodule.service;

import com.innowise.authmodule.entity.PasswordResetToken;
import com.innowise.authmodule.repository.PasswordTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@EnableScheduling
@Component
public class CollectorPasswordResetToken {

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @Scheduled(cron = "0 0 0 * * ?") //every day
    public void removeExpiredResetTokens() {
        List<PasswordResetToken> passwordResetTokenList = passwordTokenRepository.findAll();
        for (PasswordResetToken token: passwordResetTokenList) {
            if(token.isExpired()){
                System.out.println("remove token " + token.getToken());
                passwordTokenRepository.deleteById(token.getId());
            }
        }
    }

}
