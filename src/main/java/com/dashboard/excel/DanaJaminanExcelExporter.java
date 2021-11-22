package com.dashboard.excel;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.dashboard.model.DanaJaminan;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class DanaJaminanExcelExporter {
    
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<DanaJaminan> danaJaminans;
    
    // constructor function
    public DanaJaminanExcelExporter(List<DanaJaminan> danaJaminans) {
        this.danaJaminans = danaJaminans;
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
        createCell(row, 3, "jumlah", style);
        createCell(row, 4, "jangkawaktu", style);
        createCell(row, 5, "tanggalpenempatan", style);
        createCell(row, 6, "jatuhtempo", style);
        createCell(row, 7, "sukubunga", style);
        createCell(row, 8, "bungabruto", style);
        createCell(row, 9, "pph", style);
        createCell(row, 10, "bunga", style);
        createCell(row, 11, "admin", style);
        createCell(row, 12, "transferdana", style);
        createCell(row, 13, "transferdanakbi", style);
        createCell(row, 14, "penempatan", style);
        createCell(row, 15, "aro", style);
        createCell(row, 16, "multiple", style);
        createCell(row, 17, "sequence", style);

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

        for (DanaJaminan danaJaminan : danaJaminans) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            // String pattern = "yyyy/MM/dd";
            // DateFormat df = new SimpleDateFormat(pattern);
            // Date businessdate = danaJaminan.getBusinessdate();
            // String businesdatestring = df.format(businessdate);

            // createCell(row, columnCount++, businesdatestring, style);
            // createCell(row, columnCount++, danaJaminan.getJumlah(), style);
            // createCell(row, columnCount++, tglLahirString, style);

            // Cell cell = row.createCell(0);
            // cell.setCellValue(danaJaminan.getBusinessdate());
            // sheet.autoSizeColumn(0);
            CellStyle styleDate = workbook.createCellStyle();
            styleDate.setDataFormat(format.getFormat("m/d/yyyy h:mm"));
            styleDate.setBorderBottom(BorderStyle.THIN);
            styleDate.setBorderRight(BorderStyle.THIN);
            styleDate.setBorderLeft(BorderStyle.THIN);
            // cell.setCellStyle(styleDate);
            
            // cell = row.createCell(1);
            // cell.setCellValue(danaJaminan.getJumlah().doubleValue());
            // sheet.autoSizeColumn(1);
            CellStyle styleNumber = workbook.createCellStyle();
            styleNumber.setDataFormat(format.getFormat("#,##0.00####"));
            styleNumber.setBorderBottom(BorderStyle.THIN);
            styleNumber.setBorderRight(BorderStyle.THIN);
            styleNumber.setBorderLeft(BorderStyle.THIN);
            // cell.setCellStyle(styleNumber);
            
            createCell(row, columnCount++, danaJaminan.getBusinessdate(), styleDate);
            createCell(row, columnCount++, danaJaminan.getAnggotaKliring().get(0).getName(), style);
            createCell(row, columnCount++, danaJaminan.getBank(), style);
            createCell(row, columnCount++, danaJaminan.getJumlah(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getJangkawaktu(), style);
            createCell(row, columnCount++, danaJaminan.getTanggalpenempatan(), styleDate);
            createCell(row, columnCount++, danaJaminan.getJatuhtempo(), styleDate);
            createCell(row, columnCount++, danaJaminan.getSukubunga(), style);
            createCell(row, columnCount++, danaJaminan.getBungabruto(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getPph()== null ? "null" : danaJaminan.getBunga(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getBunga() == null ? "null" : danaJaminan.getBunga(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getAdmin() == null ? "null" : danaJaminan.getAdmin(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getTransferdana() == null ? "null" : danaJaminan.getTransferdana(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getTransferdanakbi() == null ? "null" : danaJaminan.getTransferdanakbi(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getPenempatan() == null ? "null" : danaJaminan.getPenempatan(), styleNumber);
            createCell(row, columnCount++, danaJaminan.getAro() == null ? "null" : danaJaminan.getAro(), style);
            createCell(row, columnCount++, danaJaminan.getMultiple() == null ? "null" : danaJaminan.getMultiple(), style);
            createCell(row, columnCount++, danaJaminan.getSequence() == null ? "null" : danaJaminan.getSequence(), style);

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
