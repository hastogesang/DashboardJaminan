package com.dashboard.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.Principal;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dashboard.excel.DanaJaminanExcelExporter;
import com.dashboard.model.keuangan.DanaCollateralParam;
import com.dashboard.model.keuangan.DanaJaminan;
import com.dashboard.model.keuangan.GetDanaJaminanView;
import com.dashboard.pdf.JasperPdfReport;
import com.dashboard.repository.keuangan.DanaJaminanRepo;
import com.dashboard.repository.keuangan.GetDanaJaminanViewRepo;
import com.dashboard.service.SendEmail;
import com.lowagie.text.DocumentException;

import org.apache.poi.ss.formula.functions.Days360;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
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
    
    @Autowired
    private GetDanaJaminanViewRepo getDanaJaminanViewRepo;

    @Autowired
    private SendEmail sendEmail;

    @Autowired
    private JasperPdfReport jasperPdfReport;

    @GetMapping(value = "/danajaminan")
    public ResponseEntity<List<DanaJaminan>> GetAllDanaJaminan() {
        try {
            List<DanaJaminan> danaJaminans = this.danaJaminanRepo.findTop1000ByOrderByIdDesc();

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
    public ResponseEntity<Object> CreateDanaJaminan(@RequestBody DanaJaminan danaJaminan, HttpServletRequest request)
    {
        String username = request.getUserPrincipal().getName();
        try {
            danaJaminan.setCreatedBy(username);
            danaJaminan.setCreatedOn(LocalDateTime.now());
            this.danaJaminanRepo.save(danaJaminan);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/danajaminan/{id}")
    public ResponseEntity<Object> UpdateDanaJaminan(@RequestBody DanaJaminan danaJaminan, @PathVariable("id") Integer id, HttpServletRequest request){
        String username = request.getUserPrincipal().getName();
        try {
            Optional<DanaJaminan> danaJaminanData = this.danaJaminanRepo.findById(id);

            if(danaJaminanData.isPresent()){
                danaJaminan.setId(id);
                danaJaminan.setAnggotaKliring(danaJaminanData.get().getAnggotaKliring());
                // danaJaminanData.get().setBusinessdate(danaJaminan.getBusinessdate());
                // danaJaminanData.get().setCode(danaJaminan.getCode());
                // danaJaminanData.get().setBank(danaJaminan.getBank());
                // danaJaminanData.get().setJumlah(danaJaminan.getJumlah());
                // danaJaminanData.get().setJangkawaktu(danaJaminan.getJangkawaktu());
                // danaJaminanData.get().setTanggalpenempatan(danaJaminan.getTanggalpenempatan());
                // danaJaminanData.get().setJatuhtempo(danaJaminan.getJatuhtempo());
                // danaJaminanData.get().setSukubunga(danaJaminan.getSukubunga());
                // danaJaminanData.get().setBungabruto(danaJaminan.getBungabruto());
                // danaJaminanData.get().setPph(danaJaminan.getPph());
                // danaJaminanData.get().setBunga(danaJaminan.getBunga());
                // danaJaminanData.get().setAdjustment(danaJaminan.getAdjustment());
                // danaJaminanData.get().setAdmin(danaJaminan.getAdmin());
                // danaJaminanData.get().setTransferdana(danaJaminan.getTransferdana());
                // danaJaminanData.get().setTransferdanakbi(danaJaminan.getTransferdanakbi());
                // danaJaminanData.get().setPenempatan(danaJaminan.getPenempatan());
                // danaJaminanData.get().setAro(danaJaminan.getAro());
                // danaJaminanData.get().setMultiple(danaJaminan.getMultiple());
                // danaJaminanData.get().setSequence(danaJaminan.getSequence());
                // danaJaminanData.get().setFlag(danaJaminan.getFlag());
                // danaJaminanData.get().setFlag_bunga(danaJaminan.getFlag_bunga());
                danaJaminan.setCreatedBy(danaJaminanData.get().getCreatedBy());
                danaJaminan.setCreatedOn(danaJaminanData.get().getCreatedOn());
                danaJaminan.setModifiedBy(username);
                danaJaminan.setModifiedOn(LocalDateTime.now());
                this.danaJaminanRepo.save(danaJaminan);
                ResponseEntity rest = new ResponseEntity<>("Success", HttpStatus.OK);
                return rest;
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
        }
    }

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

        // System.out.println(bank);
        // System.out.println(date1);
        // System.out.println(date2);
        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=report.xlsx";
        response.setHeader(headerKey, headerValue);

        List<DanaJaminan> danaJaminans = danaJaminanRepo.GetFilteredDanaJamninan(bank, date1, date2, Sort.by(Sort.Direction.DESC, "id"));
        // System.out.println(danaJaminans);
        DanaJaminanExcelExporter excelExporter = new DanaJaminanExcelExporter(danaJaminans);

        excelExporter.export(response);
    }


    @Scheduled(cron = "00 03 16 * * *")
    // @Scheduled(fixedRate = 15000)
    public void fetchDBJob() throws ParseException{

        // get data
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        List<GetDanaJaminanView> danajaminans = getDanaJaminanViewRepo.findByjatuhtempo(sdf.format(new Date()));
        
        for (int i = 0; i < danajaminans.size(); i++) {
            GetDanaJaminanView danaJaminan = danajaminans.get(i);
            List<GetDanaJaminanView> view = new ArrayList<>();
            view.add(danaJaminan);
            String jatuhtempo = danaJaminan.getJatuhtempo().toString();
            LocalDate jatuhtempoparse = LocalDate.parse(jatuhtempo);

            if(danaJaminan.getFlag_bunga() != null){
                Integer tambahBulan = 30;
                LocalDate jatuhTempoBaru = jatuhtempoparse.plusDays(tambahBulan);
                System.out.println("jatuhTempoBaru"+jatuhTempoBaru);
                System.out.println("jatuhtempoparse"+jatuhtempoparse);

                if(isWeekend(jatuhTempoBaru) == DayOfWeek.SATURDAY){
                    // System.out.println("sabtu");
                    jatuhTempoBaru = jatuhTempoBaru.plusDays(2);
                } else if(isWeekend(jatuhTempoBaru) == DayOfWeek.SUNDAY){
                    // System.out.println("minggu");
                    jatuhTempoBaru = jatuhTempoBaru.plusDays(1);
                }

                Date jatuhTempoDate = Date.from(jatuhTempoBaru.atStartOfDay(ZoneId.systemDefault()).toInstant());

                long daysBetween = Duration.between(jatuhtempoparse.atStartOfDay(), jatuhTempoBaru.atStartOfDay()).toDays();
                BigDecimal jumlah = danaJaminan.getJumlah();
                
                if(danaJaminan.getFlag_bunga().equalsIgnoreCase("F")){
                    jumlah = danaJaminan.getPenempatan();
                }
                
                BigDecimal bungaBruto =  (jumlah.multiply(danaJaminan.getSukubunga()).divide(new BigDecimal("100"), 2)).divide(BigDecimal.valueOf(365), 2).multiply(BigDecimal.valueOf(daysBetween));
                // BigDecimal bungaBruto = (jumlah * danaJaminan.get().getSukubunga() / 100) / 365 * daysBetween;
                BigDecimal bungaNeto = bungaBruto.subtract(bungaBruto.multiply(BigDecimal.valueOf(20)).divide(new BigDecimal("100"), 2));
                // // BigDecimal bungaNeto = bungaBruto - (bungaBruto * 20 / 100);
                BigDecimal pph = bungaBruto.multiply(new BigDecimal("20").divide(new BigDecimal("100")));
                BigDecimal afterAdjustment = bungaNeto.add(danaJaminan.getAdjustment());
                BigDecimal penempatan = jumlah.add(afterAdjustment).subtract(danaJaminan.getTransferdana()).subtract(danaJaminan.getTransferdanakbi());
                // var penempatan = parseFloat(jumlah) + parseFloat(afterAdjustment) - parseFloat(transferDana) - parseFloat(transferDanaKbi);
                // System.out.println(pph.setScale(4, RoundingMode.DOWN));
                
                // DanaJaminan danaJaminan2 = new DanaJaminan();
                // danaJaminan2.setBusinessdate(danaJaminan.getJatuhtempo());
                // danaJaminan2.setCode(danaJaminan.getCode());
                // danaJaminan2.setBank(danaJaminan.getBank());
                // danaJaminan2.setJumlah(jumlah.setScale(2, RoundingMode.DOWN));
                // danaJaminan2.setJangkawaktu((int) daysBetween);
                // danaJaminan2.setTanggalpenempatan(danaJaminan.getJatuhtempo());
                // danaJaminan2.setJatuhtempo(jatuhTempoDate);
                // danaJaminan2.setSukubunga(danaJaminan.getSukubunga());
                // danaJaminan2.setBungabruto(bungaBruto.setScale(4, RoundingMode.DOWN));
                // danaJaminan2.setPph(pph.setScale(4, RoundingMode.DOWN));
                // danaJaminan2.setBunga(afterAdjustment.setScale(4, RoundingMode.DOWN));
                // danaJaminan2.setAdjustment(danaJaminan.getAdjustment());
                // danaJaminan2.setAdmin(danaJaminan.getAdmin());
                // danaJaminan2.setTransferdana(danaJaminan.getTransferdana());
                // danaJaminan2.setTransferdanakbi(danaJaminan.getTransferdanakbi());
                // danaJaminan2.setPenempatan(penempatan.setScale(4, RoundingMode.DOWN));
                // danaJaminan2.setAro(danaJaminan.getAro());
                // danaJaminan2.setMultiple(danaJaminan.getMultiple());
                // danaJaminan2.setSequence(danaJaminan.getSequence());
                // danaJaminan2.setFlag(danaJaminan.getFlag());
                // danaJaminan2.setFlag_bunga(danaJaminan.getFlag_bunga());
                // danaJaminan2.setCreatedBy("scheduled");
                // danaJaminan2.setCreatedOn(LocalDateTime.now());
                // danaJaminanRepo.save(danaJaminan2);
                // System.out.println("data baru berhasil ditambahkan");

                // generate pdf
                try {
                    jasperPdfReport.exportPdf(view);
                    System.out.println("pdf berhasil di generate...");
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JRException e) {
                    e.printStackTrace();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                
                // send email
                // LocalDate today = LocalDate.now();
                // try {
                //     sendEmail.SendMail("markuskurniawan78@gmail.com",
                //             "<p>Berikut adalah :</p><h1>Test</h1><br><p>file report pdf</p>",
                //             "test reportpdf", view.get(0).getName()+"_"+today.getMonthValue()+"_"+today.getYear()+".pdf");
                // } catch (MessagingException e) {
                //     e.printStackTrace();
                // }

                // delete file
                // File fileReport = new File(view.get(0).getName()+"_"+today.getMonthValue()+"_"+today.getYear()+".pdf");
                // fileReport.delete();
                // System.out.println("file berhasil dihapus");
            }

        }

    }

    public static DayOfWeek isWeekend(final LocalDate ld) 
    {
        DayOfWeek day = DayOfWeek.of(ld.get(ChronoField.DAY_OF_WEEK));
        return day;
    }

}
