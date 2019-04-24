package com.innowise.authmodule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication
public class AuthModuleApplication {



	public static void main(String[] args) {
		SpringApplication.run(AuthModuleApplication.class, args);

	}

}
