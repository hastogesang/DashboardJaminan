package com.dashboard.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import com.dashboard.excel.DanaCollateralExcelExporter;
import com.dashboard.model.DanaCollateral;
import com.dashboard.model.DanaCollateralParam;
import com.dashboard.repository.DanaCollateralRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/danacollateral")
public class DanaCollateralApiController {
    
    @Autowired
    private DanaCollateralRepo danaCollateralRepo;

    @GetMapping("")
    public ResponseEntity<List<DanaCollateral>> GetAllDanaCollateral(){
        try {
            List<DanaCollateral> danaCollaterals = this.danaCollateralRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));

            return new ResponseEntity<>(danaCollaterals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    @PostMapping("filter")
    public ResponseEntity<List<DanaCollateral>> GetFilteredDanaCollateral(@RequestBody DanaCollateralParam param){
        try {
            String bank = null;
            Date date1 = null, date2 = null;
            if(param.getBank() != "")
                bank = param.getBank();

            if(param.getDate1() != "")
                date1 = new SimpleDateFormat("yyyy/MM/dd").parse(param.getDate1());

            if(param.getDate2() != "")
                date2 = new SimpleDateFormat("yyyy/MM/dd").parse(param.getDate2());

            List<DanaCollateral> danaCollaterals = this.danaCollateralRepo.GetFilteredDanaCollateral(bank, date1, date2, Sort.by(Sort.Direction.DESC, "id"));

            return new ResponseEntity<>(danaCollaterals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<DanaCollateral> GetDanaCollateralById(@PathVariable("id") Integer id)
    {
        try
        {
            Optional<DanaCollateral> danaCollateral = this.danaCollateralRepo.findById(id);
            if (danaCollateral.isPresent()) 
                return new ResponseEntity(danaCollateral, HttpStatus.OK);
            else
                return ResponseEntity.notFound().build();

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
                danaCollateralData.get().setBusinessdate(danaCollateral.getBusinessdate());
                danaCollateralData.get().setCode(danaCollateral.getCode());
                danaCollateralData.get().setBank(danaCollateral.getBank());
                danaCollateralData.get().setNominal(danaCollateral.getNominal());
                danaCollateralData.get().setTanggalpenempatan(danaCollateral.getTanggalpenempatan());
                danaCollateralData.get().setJatuhtempo(danaCollateral.getJatuhtempo());
                danaCollateralData.get().setJangkawaktu(danaCollateral.getJangkawaktu());
                danaCollateralData.get().setSukubunga(danaCollateral.getSukubunga());
                danaCollateralData.get().setBungabruto(danaCollateral.getBungabruto());
                danaCollateralData.get().setPph(danaCollateral.getPph());
                danaCollateralData.get().setAdjustment(danaCollateral.getAdjustment());
                danaCollateralData.get().setBunganetto(danaCollateral.getBunganetto());
                danaCollateralData.get().setBungatransfer(danaCollateral.getBungatransfer());
                danaCollateralData.get().setPenempatan(danaCollateral.getPenempatan());
                danaCollateralData.get().setAro(danaCollateral.getAro());
                danaCollateralData.get().setMultiple(danaCollateral.getMultiple());
                danaCollateralData.get().setSequence(danaCollateral.getSequence());
                danaCollateralData.get().setFlag(danaCollateral.getFlag());
                danaCollateralData.get().setAdmin(danaCollateral.getAdmin());
                
                this.danaCollateralRepo.save(danaCollateralData.get());

                return new ResponseEntity<>("success", HttpStatus.OK);
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("export") // export to excel
    public void exportToExcel(HttpServletResponse response, @RequestParam String bankParam, @RequestParam String date1Param, @RequestParam String date2Param) throws IOException, ParseException {
        String bank = bankParam != "" ? bankParam : null;
        Date date1 = date1Param != "" ? new SimpleDateFormat("yyyy/MM/dd").parse(date1Param) : null;
        Date date2 = date2Param != "" ? new SimpleDateFormat("yyyy/MM/dd").parse(date2Param) : null;

        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=report.xlsx";
        response.setHeader(headerKey, headerValue);

        List<DanaCollateral> danaCollaterals = danaCollateralRepo.GetFilteredDanaCollateral(bank, date1, date2, Sort.by(Sort.Direction.DESC, "id"));
        DanaCollateralExcelExporter excelExporter = new DanaCollateralExcelExporter(danaCollaterals);

        excelExporter.export(response);
    }

    @PostMapping("test")
    public ResponseEntity<List<DanaCollateral>> GetTestData(){
        try {

            List<DanaCollateral> danaCollaterals = this.danaCollateralRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));

            return new ResponseEntity<>(danaCollaterals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
