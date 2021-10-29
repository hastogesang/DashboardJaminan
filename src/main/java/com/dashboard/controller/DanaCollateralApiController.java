package com.dashboard.controller;

import java.util.ArrayList;
import java.util.List;

import com.dashboard.model.DanaCollateral;
// import com.dashboard.repository.DanaCollateralRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/danacollateral")
public class DanaCollateralApiController {
    
    @Autowired
    // private DanaCollateralRepo danaCollateralRepo;

    @GetMapping("")
    public ResponseEntity<List<DanaCollateral>> GetAllDanaCollateral(){
        try {
            // List<DanaCollateral> products = this.danaCollateralRepo.findAll();
            List<DanaCollateral> products = new ArrayList<>();
            products.add(DanaCollateral.builder()
            .id(1L).code("PT Prolindo Buana Semesta").bank("BCA").nominal(6400000000.0000).sukuBunga(2.6800).build());
            products.add(DanaCollateral.builder()
            .id(2L).code("PT Global Buana Karya").bank("BCA").nominal(252468042.9600).sukuBunga(2.7500).build());

            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
