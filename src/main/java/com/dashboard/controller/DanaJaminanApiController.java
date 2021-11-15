package com.dashboard.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import com.dashboard.DanaJaminanExcelExporter;
import com.dashboard.model.DanaCollateralParam;
import com.dashboard.model.DanaJaminan;
import com.dashboard.repository.DanaJaminanRepo;

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

import net.sf.jasperreports.engine.JRException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class DanaJaminanApiController {
    
    @Autowired
    private DanaJaminanRepo danaJaminanRepo;

    @GetMapping(value = "/danajaminan")
    public ResponseEntity<List<DanaJaminan>> GetAllDanaJaminan() {
        try {
            List<DanaJaminan> danaJaminans = this.danaJaminanRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));

            return new ResponseEntity<>(danaJaminans, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/danajaminan/filter")
    public ResponseEntity<List<DanaJaminan>> GetFilteredDanaJaminan(@RequestBody DanaCollateralParam param){
        try {
            String bank = null;
            if(param.getBank() != "") bank = param.getBank();
            Date date1 = null, date2 = null;
            if(param.getDate1() != "")
                date1 = new SimpleDateFormat("yyyy/MM/dd").parse(param.getDate1());

            if(param.getDate2() != "")
                date2 = new SimpleDateFormat("yyyy/MM/dd").parse(param.getDate2());

            List<DanaJaminan> danaJaminans = this.danaJaminanRepo.GetFilteredDanaJamninan(bank, date1, date2, Sort.by(Sort.Direction.DESC, "id"));

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

    // @GetMapping("/report/{format}")
    // public void GenerateReport(@PathVariable String format) throws JRException, IOException{
    //     reportService.ExportReport(format);
    // }

    @GetMapping("/danajaminan/export") // export to excel
    public void exportToExcel(HttpServletResponse response, @RequestParam String bankParam, @RequestParam String date1Param, @RequestParam String date2Param) throws IOException, ParseException {
        String bank;
        Date date1, date2;

        if(bankParam != "") {
            bank = bankParam;
        } else {
            bank = null;
        }

        if(date1Param != ""){
            date1 = new SimpleDateFormat("yyyy/MM/dd").parse(date1Param);
        } else {
            date1 = null;
        }

        if(date2Param != ""){
            date2 = new SimpleDateFormat("yyyy/MM/dd").parse(date2Param);
        } else {
            date2 = null;
        }

        System.out.println(bank);
        System.out.println(date1);
        System.out.println(date2);
        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=report.xlsx";
        response.setHeader(headerKey, headerValue);

        List<DanaJaminan> danaJaminans = danaJaminanRepo.GetFilteredDanaJamninan(bank, date1, date2, Sort.by(Sort.Direction.DESC, "id"));
        // System.out.println(danaJaminans);
        DanaJaminanExcelExporter excelExporter = new DanaJaminanExcelExporter(danaJaminans);

        excelExporter.export(response);
    }

}
