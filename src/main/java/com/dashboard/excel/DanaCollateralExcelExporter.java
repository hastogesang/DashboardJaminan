package com.dashboard.excel;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.dashboard.model.keuangan.AnggotaKliring;
import com.dashboard.model.keuangan.DanaCollateral;

import org.apache.commons.lang3.ObjectUtils.Null;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class DanaCollateralExcelExporter {
    
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<DanaCollateral> danaCollaterals;
    
    // constructor function
    public DanaCollateralExcelExporter(List<DanaCollateral> danaCollaterals) {
        this.danaCollaterals = danaCollaterals;
        workbook = new XSSFWorkbook();
    }

    // header table
    private void writeHeaderLine() {
        sheet = workbook.createSheet("page 1");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(11);
        style.setFont(font);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setAlignment(HorizontalAlignment.CENTER);
        // style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        createCell(row, 0, "bussinessdate", style);
        createCell(row, 1, "name", style);
        createCell(row, 2, "bank", style);
        createCell(row, 3, "nominal", style);
        createCell(row, 4, "tanggalpenempatan", style);
        createCell(row, 5, "jatuhtempo", style);
        createCell(row, 6 , "jangkawaktu", style);
        createCell(row, 7, "sukubunga", style);
        createCell(row, 8, "bungabruto", style);
        createCell(row, 9, "pph", style);
        createCell(row, 10, "bunganetto", style);
        createCell(row, 11, "bungatransfer", style);
        createCell(row, 12, "penempatan", style);
        createCell(row, 13, "aro", style);
        createCell(row, 14, "multiple", style);
        createCell(row, 15, "sequence", style);

    }

    // function membuat cell
    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        // if (value instanceof Integer) {
        // cell.setCellValue((Integer) value);
        // } else if (value instanceof Boolean) {
        // cell.setCellValue((Boolean) value);
        // } else if (value instanceof Date) {
        //     cell.setCellValue((Date) value);
        // } else if (value instanceof BigDecimal) {
        //     cell.setCellValue((String) value.toString());
        // } else {
        //     cell.setCellValue((String) value);
        // }
        
        if (value instanceof BigDecimal) {
            cell.setCellValue(((BigDecimal) value).doubleValue());
        } else if(value instanceof Date) {
            cell.setCellValue((Date) value);
        } else if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else {
            cell.setCellValue(value.toString());
        }

        cell.setCellStyle(style);
    }

    // data di table
    private void writeDataLines() {
        int rowCount = 1;
        DataFormat format = workbook.createDataFormat();
        CellStyle style = workbook.createCellStyle();
        // XSSFFont font = workbook.createFont();
        // font.setFontHeight(11);
        // style.setFont(font);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        // style.setDataFormat(format.getFormat("#.##0,00"));

        for (DanaCollateral danaCollateral : danaCollaterals) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            // String pattern = "yyyy/MM/dd";
            // DateFormat df = new SimpleDateFormat(pattern);
            // Date businessdate = danaCollateral.getBusinessdate();
            // String businesdatestring = df.format(businessdate);

            // createCell(row, columnCount++, businesdatestring, style);
            // createCell(row, columnCount++, danaCollateral.getJumlah(), style);
            // createCell(row, columnCount++, tglLahirString, style);

            // Cell cell = row.createCell(0);
            // cell.setCellValue(danaCollateral.getBusinessdate());
            // sheet.autoSizeColumn(0);
            CellStyle styleDate = workbook.createCellStyle();
            styleDate.setDataFormat(format.getFormat("m/d/yyyy h:mm"));
            styleDate.setBorderBottom(BorderStyle.THIN);
            styleDate.setBorderRight(BorderStyle.THIN);
            styleDate.setBorderLeft(BorderStyle.THIN);
            // cell.setCellStyle(styleDate);
            
            // cell = row.createCell(1);
            // cell.setCellValue(danaCollateral.getJumlah().doubleValue());
            // sheet.autoSizeColumn(1);
            CellStyle styleNumber = workbook.createCellStyle();
            styleNumber.setDataFormat(format.getFormat("#,##0.00####"));
            styleNumber.setBorderBottom(BorderStyle.THIN);
            styleNumber.setBorderRight(BorderStyle.THIN);
            styleNumber.setBorderLeft(BorderStyle.THIN);
            // cell.setCellStyle(styleNumber);

            createCell(row, columnCount++, danaCollateral.getBusinessdate() == null ? "null" : danaCollateral.getBusinessdate(), styleDate);
            createCell(row, columnCount++, danaCollateral.getAnggotaKliring() == null ? "null" : danaCollateral.getAnggotaKliring().get(0).getName(), style);
            createCell(row, columnCount++, danaCollateral.getBank() == null ? "null" : danaCollateral.getBank(), style);
            createCell(row, columnCount++, danaCollateral.getNominal() == null ? "null" : danaCollateral.getNominal(), styleNumber);
            createCell(row, columnCount++, danaCollateral.getTanggalpenempatan() == null ? "null" : danaCollateral.getTanggalpenempatan(), styleDate);
            createCell(row, columnCount++, danaCollateral.getJatuhtempo() == null ? "null" : danaCollateral.getJatuhtempo(), styleDate);
            createCell(row, columnCount++, danaCollateral.getJangkawaktu() == null ? "null" : danaCollateral.getJangkawaktu(), style);
            createCell(row, columnCount++, danaCollateral.getSukubunga() == null ? "null" : danaCollateral.getSukubunga(), style);
            createCell(row, columnCount++, danaCollateral.getBungabruto() == null ? "null" : danaCollateral.getBungabruto(), styleNumber);
            createCell(row, columnCount++, danaCollateral.getPph() == null ? "null" : danaCollateral.getPph(), styleNumber);
            createCell(row, columnCount++, danaCollateral.getBunganetto() == null ? "null" : danaCollateral.getBunganetto(), styleNumber);
            createCell(row, columnCount++, danaCollateral.getBungatransfer() == null ? "null" : danaCollateral.getBungatransfer(), styleNumber);
            createCell(row, columnCount++, danaCollateral.getPenempatan() == null ? "null" : danaCollateral.getPenempatan(), styleNumber);
            createCell(row, columnCount++, danaCollateral.getAro() == null ? "null" : danaCollateral.getAro(), style);
            createCell(row, columnCount++, danaCollateral.getMultiple() == null ? "null" : danaCollateral.getMultiple(), style);
            createCell(row, columnCount++, danaCollateral.getSequence() == null ? "null" : danaCollateral.getSequence(), style);

        }
    }

    // main function export
    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();

        outputStream.close();

    }
    

}
