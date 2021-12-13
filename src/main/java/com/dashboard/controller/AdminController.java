package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AdminController {
    @GetMapping(value = "/admin")
    public ModelAndView index(){
        ModelAndView view = new ModelAndView("/ample-admin/index");
        return view;
    }
}
