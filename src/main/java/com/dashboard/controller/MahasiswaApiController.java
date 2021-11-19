package com.dashboard.controller;

import java.util.List;
import java.util.Optional;

import com.dashboard.model.Mahasiswa;
import com.dashboard.repository.MahasiswaRepo;

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
@RequestMapping("/api")
public class MahasiswaApiController {

    @Autowired
    private MahasiswaRepo mahasiswaRepo;

    @GetMapping("/mahasiswa")
    public ResponseEntity<List<Mahasiswa>> GetAllMahasiswa() {
        try {
            List<Mahasiswa> mahasiswa = this.mahasiswaRepo.findAll();
            return new ResponseEntity<>(mahasiswa, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/mahasiswa/{id}")
    public ResponseEntity<List<Mahasiswa>> GetMahasiswaById(@PathVariable("id") Long id) {
        try {
            Optional<Mahasiswa> mahasiswa = this.mahasiswaRepo.findById(id);
            if (mahasiswa.isPresent()) {
                ResponseEntity rest = new ResponseEntity<>(mahasiswa, HttpStatus.OK);
                return rest;
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/mahasiswa/{id}")
    public ResponseEntity<Object> Delete(@PathVariable("id") Long id) {
        try {
            this.mahasiswaRepo.deleteById(id);
            return new ResponseEntity<>("succes", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/mahasiswa/{id}")
    public ResponseEntity<Object> UpdateDosen(@RequestBody Mahasiswa mahasiswa, @PathVariable("id") Long id) {
        try {
            Optional<Mahasiswa> mahasiswaData = this.mahasiswaRepo.findById(id);

            if (mahasiswaData.isPresent()) {
                mahasiswaData.get().setNim(mahasiswa.getNim());
                mahasiswaData.get().setNama(mahasiswa.getNama());
                mahasiswaData.get().setAlamat(mahasiswa.getAlamat());
                mahasiswaData.get().setJurusan(mahasiswa.getJurusan());
                this.mahasiswaRepo.save(mahasiswaData.get());

                ResponseEntity rest = new ResponseEntity<>("success", HttpStatus.OK);
                return rest;
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/mahasiswa")
    public ResponseEntity<Object> Save(@RequestBody Mahasiswa mahasiswa) {
        try {
            this.mahasiswaRepo.save(mahasiswa);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    

}
