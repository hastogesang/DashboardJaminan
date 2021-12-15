package com.dashboard.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.dashboard.model.keuangan.Menu;
import com.dashboard.model.keuangan.MenuRole;
import com.dashboard.model.keuangan.Role;
import com.dashboard.repository.keuangan.MenuRepo;
import com.dashboard.repository.keuangan.MenuRoleRepo;
import com.dashboard.repository.keuangan.RoleRepo;
import com.dashboard.service.HasAuthorityService;

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
public class MenuApiController {

    @Autowired
    private MenuRepo menuRepo;

    @Autowired
    private HasAuthorityService hasAuthorityService;

    @PostMapping("/menu")
    public ResponseEntity<Object> SaveMenu(@RequestBody Menu menu, HttpServletRequest request)
    {
        String username = request.getUserPrincipal().getName();
        try {
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            menu.setCreatedBy(username);
            menu.setCreatedOn(LocalDateTime.now());
            menu.setDeleted("false");
            this.menuRepo.save(menu);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/menu")
    public ResponseEntity<List<Menu>> GetAllMenu(HttpServletRequest request) {
        try {
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            List<Menu> menus = this.menuRepo.findAll();

            return new ResponseEntity<>(menus, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<List<Menu>> GetMenuById(@PathVariable("id") Integer id, HttpServletRequest request)
    {
        if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (id != 0)
        {
            Optional<Menu> mOptional = this.menuRepo.findById(id);
            ResponseEntity response = new ResponseEntity(mOptional, HttpStatus.OK);
            return response;
        } else {
            List<Menu> menus = this.menuRepo.findAll();
            return new ResponseEntity<>(menus, HttpStatus.OK);
        }
    }
    
    @PutMapping("/menu/{id}")
    public ResponseEntity<Object> UpdateMenu(@RequestBody Menu menu, @PathVariable("id") Integer id, HttpServletRequest request){
        String username = request.getUserPrincipal().getName();
        try {
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            Optional<Menu> menudata = this.menuRepo.findById(id);

            if(menudata.isPresent()){
                menu.setId(id);
                menu.setCreatedBy(menudata.get().getCreatedBy());
                menu.setCreatedOn(menudata.get().getCreatedOn());
                menu.setModifiedBy(username);
                menu.setModifiedOn(LocalDateTime.now());
                menu.setDeleted("false");
                this.menuRepo.save(menu);
                ResponseEntity rest = new ResponseEntity<>("Success", HttpStatus.OK);
                return rest;
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/menu/{id}")
    public ResponseEntity<Object> DeleteMenu(@PathVariable("id") Integer id, HttpServletRequest request) {
        try {
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if(hasAuthorityService.hasAuthority(request.getUserPrincipal().getName(),request.getRequestURI())==false){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            Optional<Menu> menuData = this.menuRepo.findById(id);
            if (menuData.isPresent()) {
                // System.out.println(categoryData.get().getCategoryName());
                menuData.get().setId(id);
                menuData.get().setDeleted("true");
                this.menuRepo.save(menuData.get());

                ResponseEntity rest = new ResponseEntity<>("success", HttpStatus.OK);
                return rest;
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private MenuRoleRepo menuRoleRepo;

    @PostMapping("menubyrolename")
    public ResponseEntity<List<Menu>> GetMenuRoleByRoleName(@RequestBody String rolename) {
        try {
            // rolename = "[admin, user]";
            String fixRolename = rolename.replaceAll("[\\[\\]]", "");
            String[] arrRolename = fixRolename.split(",", 0);
            List<Menu> menus = new ArrayList<>();
            for(int i = 0; i < arrRolename.length; i++){
                Optional<Role> oRole= roleRepo.findByRolename(arrRolename[i].trim());

                if(oRole.isPresent()){
                    List<MenuRole> menuRoles = menuRoleRepo.findByRoleId(oRole.get().getId());
                    for(MenuRole menuRole : menuRoles){
                        if(!menus.contains(menuRole.menu))
                            menus.add(menuRole.menu);
                    }
                }
            }
            
            return new ResponseEntity<>(menus, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
