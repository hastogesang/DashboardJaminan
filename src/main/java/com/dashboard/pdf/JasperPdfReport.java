package com.dashboard.pdf;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dashboard.model.DanaJaminan;
import com.dashboard.repository.DanaJaminanRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.JdbcAccessor;
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
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;

@Service
public class JasperPdfReport {

    @Autowired
    private DanaJaminanRepo danaJaminanRepo;

    private JdbcTemplate jdbcTemplate;

    public void exportPdf() throws FileNotFoundException, JRException, SQLException{
        // List<DanaJaminan> danajaminans = danaJaminanRepo.findTop1000ByOrderByIdDesc();
        // JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(danajaminans);
        File file = ResourceUtils.getFile("Blank_A4.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        // Connection conn = jdbcTemplate.getDataSource().getConnection();

        Map<String, Object> parameters = new HashMap<>();

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());
        JasperExportManager.exportReportToPdfFile(jasperPrint, "reportfromjasper.pdf");
        // JRPdfExporter exporter = new JRPdfExporter();
        // exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        // exporter.setExporterOutput(new SimpleOutputStreamExporterOutput("testing.pdf"));

        // SimplePdfReportConfiguration reportConfig = new SimplePdfReportConfiguration();
        // reportConfig.setSizePageToContent(true);
        // reportConfig.setForceLineBreakPolicy(false);

        // SimplePdfExporterConfiguration exportConfig = new SimplePdfExporterConfiguration();
        // exportConfig.setMetadataAuthor("markus");
        // exportConfig.setEncrypted(true);
        // exportConfig.setAllowedPermissionsHint("PRINTING");

        // exporter.setConfiguration(reportConfig);
        // exporter.setConfiguration(exportConfig);

        // exporter.exportReport();
    }
}

