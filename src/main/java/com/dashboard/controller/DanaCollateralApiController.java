package com.dashboard.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.dashboard.model.DanaCollateral;
import com.dashboard.repository.DanaCollateralRepo;

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

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/danacollateral")
public class DanaCollateralApiController {
    
    @Autowired
    private DanaCollateralRepo danaCollateralRepo;

    @GetMapping("")
    public ResponseEntity<List<DanaCollateral>> GetAllDanaCollateral(){
        try {
            List<DanaCollateral> danaCollaterals = this.danaCollateralRepo.findAll();

            return new ResponseEntity<>(danaCollaterals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<List<DanaCollateral>> GetDanaCollateralById(@PathVariable("id") Integer id)
    {
        if (id != 0)
        {
            List<DanaCollateral> danaCollateral = this.danaCollateralRepo.findDanaCollateralById(id);
            return new ResponseEntity<>(danaCollateral, HttpStatus.OK);
        } else {
            List<DanaCollateral> danaCollateral = this.danaCollateralRepo.findAll();
            return new ResponseEntity<>(danaCollateral, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> CreateDanaCollateral(@RequestBody DanaCollateral danaCollateral)
    {
        try {
            this.danaCollateralRepo.save(danaCollateral);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("")
    public ResponseEntity<Object> EditDanaCollateral(@RequestBody DanaCollateral danaCollateral){
        try {
            Optional<DanaCollateral> danaCollateralData = this.danaCollateralRepo.findById(danaCollateral.getId());

            if(danaCollateralData.isPresent()){
                danaCollateralData.get().setCode(danaCollateral.getCode());
                
                this.danaCollateralRepo.save(danaCollateralData.get());

                return new ResponseEntity<>("success", HttpStatus.OK);
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("get")
    public List<DanaCollateral> GetDanaCollateral(){
            List<DanaCollateral> danaCollaterals = this.danaCollateralRepo.findAll();
            return danaCollaterals;
    }

    @GetMapping("pdf")
    public String generatePdf() throws FileNotFoundException, JRException
    {
        JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(GetDanaCollateral());
        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("src/main/resources/static/assets/Blank_A4.jrxml"));
        
        HashMap<String, Object> map = new HashMap<>();
        JasperPrint fillReport = JasperFillManager.fillReport(compileReport, map, beanCollectionDataSource);
        JasperExportManager.exportReportToPdfFile(fillReport, "D:\\dana.pdf");

        return "Generated";
    }
}
