package com.dashboard.controller;

import javax.servlet.http.HttpServletRequest;

import com.dashboard.service.HasAuthorityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private HasAuthorityService hasAuthorityService;

    @GetMapping("")
    public ModelAndView index(HttpServletRequest request) {
        if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())){
            ModelAndView view = new ModelAndView("user/index");
            return view;
        } else {
            ModelAndView home = new ModelAndView("index");
            return home;
        }
    }
}
