package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/anggotakliring")
public class AnggotaKliringController {
    @GetMapping(value = "")
    public ModelAndView index() {
        ModelAndView view = new ModelAndView("anggota_kliring/index");
        return view;
    }
}
