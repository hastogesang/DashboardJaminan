package com.dashboard.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.dashboard.model.keuangan.Role;
import com.dashboard.repository.keuangan.RoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
public class RoleApiController {

    @Autowired
    private RoleRepo roleRepo;

    @PostMapping("/role")
    public ResponseEntity<Object> SaveRole(@RequestBody Role role, HttpServletRequest request)
    {
        String username = request.getUserPrincipal().getName();
        try {
            role.setCreatedBy(username);
            role.setCreatedOn(LocalDateTime.now());
            role.setDeleted("false");
            this.roleRepo.save(role);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/role")
    public ResponseEntity<List<Role>> GetAllRole() {
        try {
            List<Role> roles = this.roleRepo.findAll();

            return new ResponseEntity<>(roles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/rolebyname/{rolename}")
    public ResponseEntity<List<Role>> GetRoleByRolename(@PathVariable("rolename") String rolename)
    {
        if (rolename != null)
        {
            Optional<Role> rOptional = this.roleRepo.findByRolename(rolename);
            ResponseEntity response = new ResponseEntity(rOptional, HttpStatus.OK);
            return response;
        } else {
            List<Role> roles = this.roleRepo.findAll();
            return new ResponseEntity<>(roles, HttpStatus.OK);
        }
    }

    @GetMapping("/role/{id}")
    public ResponseEntity<List<Role>> GetRoleById(@PathVariable("id") Integer id)
    {
        if (id != null)
        {
            Optional<Role> rOptional = this.roleRepo.findById(id);
            ResponseEntity response = new ResponseEntity(rOptional, HttpStatus.OK);
            return response;
        } else {
            List<Role> roles = this.roleRepo.findAll();
            return new ResponseEntity<>(roles, HttpStatus.OK);
        }
    }

    @PutMapping("/role/{id}")
    public ResponseEntity<Object> UpdateRole(@RequestBody Role role, @PathVariable("id") Integer id, HttpServletRequest request){
        String username = request.getUserPrincipal().getName();
        try {
            Optional<Role> roledata = this.roleRepo.findById(id);

            if(roledata.isPresent()){
                role.setId(id);
                role.setCreatedBy(roledata.get().getCreatedBy());
                role.setCreatedOn(roledata.get().getCreatedOn());
                role.setModifiedBy(username);
                role.setModifiedOn(LocalDateTime.now());
                role.setDeleted("false");
                this.roleRepo.save(role);
                ResponseEntity rest = new ResponseEntity<>("Success", HttpStatus.OK);
                return rest;
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/role/{id}")
    public ResponseEntity<Object> DeleteRole(@PathVariable("id") Integer id) {
        try {
            Optional<Role> roleData = this.roleRepo.findById(id);
            if (roleData.isPresent()) {
                // System.out.println(categoryData.get().getCategoryName());
                roleData.get().setId(id);
                roleData.get().setDeleted("true");
                this.roleRepo.save(roleData.get());

                ResponseEntity rest = new ResponseEntity<>("success", HttpStatus.OK);
                return rest;
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }
    
}