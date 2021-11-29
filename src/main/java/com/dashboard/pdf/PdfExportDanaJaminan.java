package com.dashboard.pdf;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.awt.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;

import com.dashboard.model.DanaJaminan;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import org.jfree.util.Log;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.ResourceUtils;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;

public class PdfExportDanaJaminan {

    private List<DanaJaminan> danaJaminans;

    public PdfExportDanaJaminan(List<DanaJaminan> danaJaminans) {
        this.danaJaminans = danaJaminans;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        // cell.setBackgroundColor(Color.BLUE);
        // cell.setPadding(5);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.BLACK);
        // Font font = new Font(Font.HELVETICA, 12, Font.BOLDITALIC);
         
        cell.setPhrase(new Phrase("User ID", font));
         
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("E-mail", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Full Name", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Roles", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Enabled", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("test", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("code", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        for (DanaJaminan danaJaminan : danaJaminans) {
            table.addCell(String.valueOf(danaJaminan.getId()));
            table.addCell(danaJaminan.getBank());
            table.addCell(String.valueOf(danaJaminan.getJumlah()));
            table.addCell(danaJaminan.getBusinessdate().toString());
            table.addCell(String.valueOf(danaJaminan.getJatuhtempo()));
            table.addCell(String.valueOf(danaJaminan.getBusinessdate()));
            table.addCell(danaJaminan.getCode());
        }
    }

    public void export(String pdfPath) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, new FileOutputStream(pdfPath));
         
        document.open();
        // Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        // font.setSize(18);
        // font.setColor(Color.BLUE);
        // Font font = new Font(Font.HELVETICA, 16, Font.BOLDITALIC, Color.RED);
         
        // Paragraph p = new Paragraph("Hello! This PDF is created using openPDF", font);
        // p.setAlignment(Paragraph.ALIGN_CENTER);

        // document.add(p);
         
        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {3.0f, 3.8f, 6.5f, 6.0f, 6.0f, 6.0f, 3.0f});
        table.setSpacingBefore(10);
         
        writeTableHeader(table);
        writeTableData(table);
         
        document.add(table);
         
        document.close();
         
    }
    
}
