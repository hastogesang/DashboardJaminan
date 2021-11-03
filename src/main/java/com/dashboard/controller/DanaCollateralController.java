package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/danacollateral")
public class DanaCollateralController {
    @GetMapping("")
    public ModelAndView index() {
        ModelAndView view = new ModelAndView("dana_collateral/index");
        return view;
    }
}
