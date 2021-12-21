package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Login2Controller {

    @GetMapping(value = "/login2")
    public ModelAndView index(){
        ModelAndView view = new ModelAndView("login2");
        return view;
    }
    
}
