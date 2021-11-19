package com.dashboard.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoField;
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
import org.springframework.scheduling.annotation.Scheduled;
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
            // List<DanaCollateral> danaCollaterals = this.danaCollateralRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<DanaCollateral> danaCollaterals = this.danaCollateralRepo.findTop1000ByOrderByIdDesc();

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

    // @Scheduled(fixedRate = 100000)
    @Scheduled(cron = "00 00 08 * * *")
    public void fetchDBJob() throws ParseException{
        List<DanaCollateral> danaCollaterals = danaCollateralRepo.findTop1000ByOrderByIdDesc();

        LocalDate today = LocalDate.now();

        for (int i = 0; i < danaCollaterals.size(); i++) {
            Optional<DanaCollateral> danaCollateral = danaCollateralRepo.findById(danaCollaterals.get(i).getId());
            String jatuhtempo = danaCollaterals.get(i).getJatuhtempo().toString();
            LocalDate jatuhtempoparse = LocalDate.parse(jatuhtempo);

            if(danaCollateral.isPresent()){
                if(today.isEqual(jatuhtempoparse)){
                    if(danaCollateral.get().getAro().equalsIgnoreCase("T")){
                        Integer tambahBulan = 30;
                        Long adjustment = 0L;
                        LocalDate jatuhTempoBaru = jatuhtempoparse.plusDays(tambahBulan);

                        if(isWeekend(jatuhTempoBaru) == DayOfWeek.SATURDAY){
                            jatuhTempoBaru = jatuhTempoBaru.plusDays(2);
                        } else if(isWeekend(jatuhTempoBaru) == DayOfWeek.SUNDAY){
                            jatuhTempoBaru = jatuhTempoBaru.plusDays(1);
                        }

                        Date jatuhTempoDate = Date.from(jatuhTempoBaru.atStartOfDay(ZoneId.systemDefault()).toInstant());
                        long daysBetween = Duration.between(jatuhtempoparse.atStartOfDay(), jatuhTempoBaru.atStartOfDay()).toDays();

                        BigDecimal nominal = danaCollateral.get().getNominal();
                        BigDecimal bungaBruto = (nominal.multiply(danaCollateral.get().getSukubunga()).divide(BigDecimal.valueOf(100), 2)).divide(BigDecimal.valueOf(365), 2).multiply(BigDecimal.valueOf(daysBetween));
                        BigDecimal pph = bungaBruto.multiply(BigDecimal.valueOf(20)).divide(BigDecimal.valueOf(100), 2);
                        BigDecimal bungaNeto = bungaBruto.subtract(pph);
                        BigDecimal afterAdjustment = bungaNeto.add(BigDecimal.valueOf(adjustment));
                        BigDecimal penempatan = nominal.add(afterAdjustment).subtract(danaCollateral.get().getBungatransfer());

                        DanaCollateral danaCollateralData = new DanaCollateral();
                        danaCollateralData.setBusinessdate(danaCollateral.get().getJatuhtempo());
                        danaCollateralData.setCode(danaCollateral.get().getCode());
                        danaCollateralData.setBank(danaCollateral.get().getBank());
                        danaCollateralData.setNominal(danaCollateral.get().getNominal());
                        danaCollateralData.setTanggalpenempatan(danaCollateral.get().getJatuhtempo());
                        danaCollateralData.setJatuhtempo(jatuhTempoDate);
                        danaCollateralData.setJangkawaktu((int) daysBetween);
                        danaCollateralData.setSukubunga(danaCollateral.get().getSukubunga());
                        danaCollateralData.setBungabruto(bungaBruto.setScale(4, RoundingMode.DOWN));
                        danaCollateralData.setPph(pph.setScale(4, RoundingMode.DOWN));
                        danaCollateralData.setAdjustment(BigDecimal.valueOf(adjustment));
                        danaCollateralData.setBunganetto(afterAdjustment.setScale(4, RoundingMode.DOWN));
                        danaCollateralData.setBungatransfer(danaCollateral.get().getBungatransfer());
                        danaCollateralData.setPenempatan(penempatan.setScale(4, RoundingMode.DOWN));
                        danaCollateralData.setAro(danaCollateral.get().getAro());
                        danaCollateralData.setMultiple(danaCollateral.get().getMultiple());
                        danaCollateralData.setSequence(danaCollateral.get().getSequence());
                        danaCollateralData.setFlag(danaCollateral.get().getFlag());
                        danaCollateralData.setAdmin(danaCollateral.get().getAdmin());
                        danaCollateralRepo.save(danaCollateralData);
                    }
                }
            }
        }
    }

    public static DayOfWeek isWeekend(final LocalDate ld) 
    {
        DayOfWeek day = DayOfWeek.of(ld.get(ChronoField.DAY_OF_WEEK));
        return day;
    }
}
 