package com.dashboard.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.dashboard.model.keuangan.User;
import com.dashboard.repository.keuangan.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
@RequestMapping("/api/user")
public class UserApiController {
    @Autowired private UserRepo userRepo;

    @GetMapping("")
    public ResponseEntity<List<User>> GetAllUser(){
        try {
            List<User> users = this.userRepo.findTop1000ByOrderByIdDesc();

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<User> GetUserById(@PathVariable("id") Integer id)
    {
        try
        {
            Optional<User> user = this.userRepo.findById(id);
            if (user.isPresent()) 
                return new ResponseEntity(user, HttpStatus.OK);
            else
                return ResponseEntity.notFound().build();

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("username/{username}")
    public ResponseEntity<User> GetUserByUsername(@PathVariable("username") String username)
    {
        try
        {
            User user = this.userRepo.getUserByUsername(username);
           
            return new ResponseEntity(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> CreateUser(@RequestBody User user, HttpServletRequest request)
    {
        try {
            user.setPassword(passwordEncoders().encode(user.getPassword()));
            user.setCreatedBy(request.getUserPrincipal().getName());
            user.setCreatedOn(LocalDateTime.now());
            user.setDeleted("false");
            this.userRepo.save(user);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    public PasswordEncoder passwordEncoders()
    {
        return new BCryptPasswordEncoder();
    }

    @PutMapping("")
    public ResponseEntity<Object> EditUser(@RequestBody User user, HttpServletRequest request){
        try {
            Optional<User> userData = this.userRepo.findById(user.getId());

            if(userData.isPresent()){
                userData.get().setUsername(user.getUsername());

                if(!user.getPassword().equals(userData.get().getPassword())){
                    userData.get().setPassword(passwordEncoders().encode(user.getPassword()));
                }

                userData.get().setDivisi(user.getDivisi());
                userData.get().setModifiedBy(request.getUserPrincipal().getName());
                userData.get().setModifiedOn(LocalDateTime.now());
                this.userRepo.save(userData.get());

                return new ResponseEntity<>("success", HttpStatus.OK);
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> DeleteUser(@PathVariable("id") Integer id, HttpServletRequest request){
        try {
            Optional<User> userData = this.userRepo.findById(id);

            if(userData.isPresent()){
                userData.get().setDeleted("true");
                userData.get().setModifiedBy(request.getUserPrincipal().getName());
                userData.get().setModifiedOn(LocalDateTime.now());
                this.userRepo.save(userData.get());

                return new ResponseEntity<>("success", HttpStatus.OK);
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }
}
