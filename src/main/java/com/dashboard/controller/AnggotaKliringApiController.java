package com.dashboard.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.dashboard.model.keuangan.AnggotaKliring;
import com.dashboard.repository.keuangan.AnggotaKliringRepo;

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
            List<AnggotaKliring> anggotaKliring = this.anggotaKliringRepo.findTop1000ByOrderByIdDesc();

            return new ResponseEntity<>(anggotaKliring, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<AnggotaKliring> GetAnggotaKliringById(@PathVariable("id") Integer id)
    {
        try
        {
            AnggotaKliring anggotaKliring = this.anggotaKliringRepo.findAnggotaKliringById(id);
            return new ResponseEntity<>(anggotaKliring, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> CreateAnggotaKliring(@RequestBody AnggotaKliring anggotaKliring)
    {
        try {
            Optional<String> anggotaKliringOpt = this.anggotaKliringRepo.isCodeExist(anggotaKliring.getCode());
            if(anggotaKliringOpt.isPresent())
                return new ResponseEntity<>("code already exists", HttpStatus.BAD_REQUEST);
            else {
                anggotaKliring.setCreatedBy("admin");
                anggotaKliring.setCreatedOn(LocalDateTime.now());
                this.anggotaKliringRepo.save(anggotaKliring);
                return new ResponseEntity<>("success", HttpStatus.OK);
            }

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
                anggotaKliringData.get().setName(anggotaKliring.getName());
                anggotaKliringData.get().setAddress(anggotaKliring.getAddress());
                anggotaKliringData.get().setType(anggotaKliring.getType());
                anggotaKliringData.get().setModifiedBy("admin");
                anggotaKliringData.get().setModifiedOn(LocalDateTime.now());
                
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
