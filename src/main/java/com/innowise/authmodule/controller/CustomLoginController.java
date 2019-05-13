package com.innowise.authmodule.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CustomLoginController  {


    @GetMapping("/login")
    String thymeleafPage(Model model, @RequestParam(required = false) String redirect_uri) {
        model.addAttribute("redirect_uri", redirect_uri);
        return "thymeleaf/login";
    }


}
