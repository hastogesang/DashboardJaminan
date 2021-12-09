package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/menu")
public class MenuController {
    
    @GetMapping()
    public ModelAndView index(){
        ModelAndView view = new ModelAndView("/menu/index");
        return view;
    }

}
