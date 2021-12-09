package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/role")
public class RoleController {
    
    @GetMapping()
    public ModelAndView index(){
        ModelAndView view = new ModelAndView("/role/index");
        return view;
    }

}
