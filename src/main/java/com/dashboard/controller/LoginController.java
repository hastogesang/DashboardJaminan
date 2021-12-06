package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @GetMapping(value = "/login")
    public ModelAndView index(){
        ModelAndView view = new ModelAndView("login");
        return view;
    }
    
}
