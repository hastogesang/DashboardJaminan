package com.dashboard.pdf;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dashboard.model.keuangan.GetDanaCollateralView;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class JasperPdfReportDanaCollateral {
    public void exportPdf(List<GetDanaCollateralView> getDanaCollateralViews) throws FileNotFoundException, JRException, SQLException{
        File file = ResourceUtils.getFile("Blank_A4_DanaCollateral.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

        Map<String, Object> parameters = new HashMap<>();

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, new JRBeanCollectionDataSource(getDanaCollateralViews));
        LocalDate today = LocalDate.now();
        JasperExportManager.exportReportToPdfFile(jasperPrint, getDanaCollateralViews.get(0).getName()+"_"+today.getMonthValue()+"_"+today.getYear()+".pdf");
    }
}
