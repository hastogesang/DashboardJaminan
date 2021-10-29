package com.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/danacollateral")
public class DanaCollateralController {
    @GetMapping(value = "")
    public ModelAndView index() {
        ModelAndView view = new ModelAndView("dana_collateral/index");
        return view;
    }

    // @GetMapping(value = "create")
    // public ModelAndView create() {
    //     ModelAndView view = new ModelAndView("dana_collateral/create");
    //     return view;
    // }
}
