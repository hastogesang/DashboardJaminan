package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/mahasiswa")
public class MahasiswaController {
    @GetMapping(value = "index")
    public ModelAndView index() {
        ModelAndView view = new ModelAndView("mahasiswa/index");
        return view;
    }
}
