package com.dashboard.controller;

import java.util.List;
import java.util.Optional;

import com.dashboard.model.DanaJaminan;
import com.dashboard.repository.DanaJaminanRepo;

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
@RequestMapping("/api")
public class DanaJaminanApiController {
    
    @Autowired
    private DanaJaminanRepo danaJaminanRepo;

    @GetMapping("/danajaminan")
    public ResponseEntity<List<DanaJaminan>> GetAllDanaJaminan(){
        try {
            List<DanaJaminan> danaJaminans = this.danaJaminanRepo.GetDanaJaminan();

            return new ResponseEntity<>(danaJaminans, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/danajaminan/{id}")
    public ResponseEntity<List<DanaJaminan>> GetDanaJaminanById(@PathVariable("id") Integer id)
    {
        if (id != 0)
        {
            Optional<DanaJaminan> danaJaminans = this.danaJaminanRepo.findById(id);
            ResponseEntity response = new ResponseEntity(danaJaminans, HttpStatus.OK);
            return response;
        } else {
            List<DanaJaminan> danaJaminans = this.danaJaminanRepo.findAll();
            return new ResponseEntity<>(danaJaminans, HttpStatus.OK);
        }
    }

    @PostMapping("/danajaminan")
    public ResponseEntity<Object> CreateDanaJaminan(@RequestBody DanaJaminan danaJaminan)
    {
        try {
            this.danaJaminanRepo.save(danaJaminan);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/danajaminan")
    public ResponseEntity<Object> EditDanaJaminan(@RequestBody DanaJaminan danaJaminan){
        try {
            Optional<DanaJaminan> danaJaminanData = this.danaJaminanRepo.findById(danaJaminan.getId());

            if(danaJaminanData.isPresent()){
                danaJaminanData.get().setId(danaJaminan.getId());
                
                this.danaJaminanRepo.save(danaJaminanData.get());

                return new ResponseEntity<>("success", HttpStatus.OK);
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

}
