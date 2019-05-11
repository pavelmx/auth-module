package com.innowise.authmodule.security;


import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class MySimpleUrlAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        String redirectUri = request.getParameter("redirect_uri");
        System.out.println("redirect_uri " + redirectUri);

        if(redirectUri != null && redirectUri != "")
            setDefaultTargetUrl(redirectUri);
        else{
            setDefaultTargetUrl("http://localhost:8080/auth/home");
        }
        super.onAuthenticationSuccess(request, response, authentication);
    }

}