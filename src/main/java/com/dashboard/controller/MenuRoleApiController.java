package com.dashboard.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.dashboard.model.keuangan.MenuRole;
import com.dashboard.repository.keuangan.MenuRoleRepo;
import com.dashboard.service.HasAuthorityService;

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
@RequestMapping("/api")
public class MenuRoleApiController {
    
    @Autowired
    private MenuRoleRepo menuRoleRepo;

    @Autowired
    private HasAuthorityService hasAuthorityService;

    @GetMapping("/menurole")
    public ResponseEntity<List<MenuRole>> GetAllMenuRole(HttpServletRequest request){
        try {
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            List<MenuRole> menuRoleList = this.menuRoleRepo.findAll();
            return new ResponseEntity<>(menuRoleList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/menurole/{id}")
    public ResponseEntity<List<MenuRole>> GetMenuRoleById(@PathVariable("id") Integer id, HttpServletRequest request) {
        try {
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
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

    @PostMapping("/menurole")
    public ResponseEntity<Object> CreateMenuRole(@RequestBody MenuRole menuRole, HttpServletRequest request)
    {
        String username = request.getUserPrincipal().getName();
        try {
            menuRole.setCreatedBy(username);
            menuRole.setCreatedOn(LocalDateTime.now());
            this.menuRoleRepo.save(menuRole);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/menurole/{id}")
    public ResponseEntity<Object> DeleteMenuRole(@PathVariable("id") Integer id, HttpServletRequest request)
    {
        this.menuRoleRepo.deleteByRoleId(id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

}
