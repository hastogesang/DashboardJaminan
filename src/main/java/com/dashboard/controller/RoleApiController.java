package com.dashboard.controller;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.dashboard.model.keuangan.Role;
import com.dashboard.repository.keuangan.RoleRepo;
import com.dashboard.service.HasAuthorityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    private HasAuthorityService hasAuthorityService;

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
    public ResponseEntity<List<Role>> GetAllRole(HttpServletRequest request) {
        try {
            // if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
            //     return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            // }
            List<Role> roles = this.roleRepo.findAll();

            return new ResponseEntity<>(roles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/rolebyname/{rolename}")
    public ResponseEntity<Role> GetRoleByRolename(@PathVariable("rolename") String rolename, HttpServletRequest request)
    {
        try
        {
            // if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
            //     return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            // }
            Role role = this.roleRepo.getRoleByRolename(rolename);
           
            return new ResponseEntity(role, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/role/{id}")
    public ResponseEntity<List<Role>> GetRoleById(@PathVariable("id") Integer id, HttpServletRequest request)
    {
        if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
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

    @PutMapping("/role")
    public ResponseEntity<Object> UpdateRole(@RequestBody Role role, HttpServletRequest request){
        String username = request.getUserPrincipal().getName();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> currentPrincipalName = authentication.getAuthorities();
        try {
            Optional<Role> roledata = this.roleRepo.findById(role.getId());

            if(roledata.isPresent()){
                role.setCreatedBy(roledata.get().getCreatedBy());
                role.setCreatedOn(roledata.get().getCreatedOn());
                role.setModifiedBy(username);
                role.setModifiedOn(LocalDateTime.now());
                this.roleRepo.save(role);
                ResponseEntity rest = new ResponseEntity<>(currentPrincipalName, HttpStatus.OK);
                return rest;
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/role/{id}")
    public ResponseEntity<Object> DeleteRole(@PathVariable("id") Integer id, HttpServletRequest request) {
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
