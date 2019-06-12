package com.innowise.authmodule.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

@Service
public class EmailServiceImpl {

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("test.springboot.mail1@gmail.com");
        mailSender.setPassword("test1springboot1mail1");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }


    public void sendEmail(String to, String from, String subject, String message) {
        try {
            MimeMessage mes = getJavaMailSender().createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mes,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            helper.setTo(to);
            helper.setText(message);
            helper.setSubject(subject);
            helper.setFrom(from);

            getJavaMailSender().send(mes);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}
