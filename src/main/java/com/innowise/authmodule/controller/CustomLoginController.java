package com.innowise.authmodule.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Map;

@Controller
public class CustomLoginController {

//    @GetMapping("/jsp")
//    public String jsp(Model model, @RequestParam(required = false) String redirect_uri){
//        model.addAttribute("redirect_uri", redirect_uri);
//        return "jsp/login";
//    }
//
//    @RequestMapping("/login")
//    public String login(@RequestParam(required = false) String redirect_uri, ModelMap model){
//        model.addAttribute("redirect_uri", redirect_uri);
//        return "redirect:/login.html";
//    }

    @GetMapping("/jsp")
    String jspPage(Model model,@RequestParam(required = false) String redirect_uri) {
        model.addAttribute("redirect_uri", redirect_uri);
        return "jsp/login";
    }

    @GetMapping("/login")
    String thymeleafPage(Model model,@RequestParam(required = false) String redirect_uri) {
        model.addAttribute("redirect_uri", redirect_uri);
        return "thymeleaf/login";
    }

}
