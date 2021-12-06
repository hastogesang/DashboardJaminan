package com.dashboard.controller;

import java.util.List;

import com.dashboard.model.keuangan.MenuRole;
import com.dashboard.repository.keuangan.MenuRoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class MenuRoleApiController {
    
    @Autowired
    private MenuRoleRepo menuRoleRepo;

    @GetMapping("/menurole")
    public ResponseEntity<List<MenuRole>> GetAllMenuRole(){
        try {
            List<MenuRole> menuRoleList = this.menuRoleRepo.findAll();
            return new ResponseEntity<>(menuRoleList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/menurole/{id}")
    public ResponseEntity<List<MenuRole>> GetMenuRoleById(@PathVariable("id") Long id) {
        try {
            //optional berarti data yang dicari bisa null
            List<MenuRole> menuRoleOptional = this.menuRoleRepo.findByRoleId(id);
            // if (menuRoleOptional.isPresent()) {
                ResponseEntity rest = new ResponseEntity(menuRoleOptional, HttpStatus.OK);
                return rest;
            // } else {
            //     return ResponseEntity.notFound().build();
            // }
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
