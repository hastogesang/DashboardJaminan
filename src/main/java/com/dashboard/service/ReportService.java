package com.dashboard.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.dashboard.model.DanaJaminan;
import com.dashboard.repository.DanaJaminanRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;

@Service
public class ReportService {
    
    @Autowired
    private DanaJaminanRepo danaJaminanRepo;

    public void ExportReport(String reportFormat) throws JRException, IOException{
        List<DanaJaminan> danaJaminans = danaJaminanRepo.GetDanaJaminan();
        File file = ResourceUtils.getFile("C:\\Users\\Asus\\JaspersoftWorkspace\\MyReports\\report.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(danaJaminans);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null, beanCollectionDataSource);
        if(reportFormat.equalsIgnoreCase("pdf")) {
            JasperExportManager.exportReportToPdfFile(jasperPrint, "D:\\invoice.pdf");
        }
        if(reportFormat.equalsIgnoreCase("xls")) {
            JRXlsxExporter exporter = new JRXlsxExporter(); // initialize exporter 
            exporter.setExporterInput(new SimpleExporterInput(jasperPrint)); // set compiled report as input
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput("D:\\invoice.xls"));  // set output file via path with filename
            SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
            configuration.setOnePagePerSheet(true);
            configuration.setDetectCellType(true);
            configuration.setCollapseRowSpan(true);
            configuration.setRemoveEmptySpaceBetweenColumns(true);
            configuration.isIgnoreAnchors();
            exporter.setConfiguration(configuration);
            exporter.exportReport();
        }

    }

}
