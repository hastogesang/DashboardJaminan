package com.dashboard.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.dashboard.model.keuangan.UserRole;
import com.dashboard.repository.keuangan.UserRoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/userrole")
public class UserRoleApiController {
    @Autowired private UserRoleRepo userRoleRepo;

    @GetMapping("")
    public ResponseEntity<List<UserRole>> GetAllUser(){
        try {
            List<UserRole> userRoles = this.userRoleRepo.findTop1000ByOrderByIdDesc();

            return new ResponseEntity<>(userRoles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<List<UserRole>> GetUserRolesByuserId(@PathVariable("id") Integer id){
        try {
            List<UserRole> userRoles = this.userRoleRepo.findByuserId(id);

            return new ResponseEntity<>(userRoles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    @PostMapping("")
    public ResponseEntity<Object> CreateUserRoles(@RequestBody UserRole userRole, HttpServletRequest request)
    {
        try {
            this.userRoleRepo.save(userRole);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> DeleteUserRoles(@PathVariable("id") Integer id)
    {
        try {
            this.userRoleRepo.deleteByUserId(id);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }
}
