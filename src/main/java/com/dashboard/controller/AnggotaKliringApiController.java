package com.dashboard.controller;

import java.util.List;
import java.util.Optional;

import com.dashboard.model.AnggotaKliring;
import com.dashboard.repository.AnggotaKliringRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/anggotakliring")
public class AnggotaKliringApiController {
    
    @Autowired
    private AnggotaKliringRepo anggotaKliringRepo;

    @GetMapping("")
    public ResponseEntity<List<AnggotaKliring>> GetAllAnggotaKliring(){
        try {
            List<AnggotaKliring> anggotaKliring = this.anggotaKliringRepo.findAll();

            return new ResponseEntity<>(anggotaKliring, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<List<AnggotaKliring>> GetAnggotaKliringById(@PathVariable("id") Integer id)
    {
        if (id != 0)
        {
            List<AnggotaKliring> anggotaKliring = this.anggotaKliringRepo.findAnggotaKliringById(id);
            return new ResponseEntity<>(anggotaKliring, HttpStatus.OK);
        } else {
            List<AnggotaKliring> anggotaKliring = this.anggotaKliringRepo.findAll();
            return new ResponseEntity<>(anggotaKliring, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> CreateAnggotaKliring(@RequestBody AnggotaKliring anggotaKliring)
    {
        try {
            this.anggotaKliringRepo.save(anggotaKliring);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("")
    public ResponseEntity<Object> EditAnggotaKliring(@RequestBody AnggotaKliring anggotaKliring){
        try {
            Optional<AnggotaKliring> anggotaKliringData = this.anggotaKliringRepo.findById(anggotaKliring.getId());

            if(anggotaKliringData.isPresent()){
                anggotaKliringData.get().setCode(anggotaKliring.getCode());
                
                this.anggotaKliringRepo.save(anggotaKliringData.get());

                return new ResponseEntity<>("success", HttpStatus.OK);
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }
}
