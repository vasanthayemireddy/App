 package com.example.demo.dao;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import com.example.demo.model.Requirement;

@Repository
public class ExcelView extends AbstractXlsView{

@Override
protected void buildExcelDocument(Map<String, Object> model,
                                  Workbook workbook,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {

    // change the file name
    response.setHeader("Content-Disposition", "attachment; filename=\"my-xls-file.xls\"");

    @SuppressWarnings("unchecked")
    List<Requirement> users = (List<Requirement>) model.get("users");

    // create excel xls sheet
    Sheet sheet = workbook.createSheet("User Detail");
    sheet.setDefaultColumnWidth(30);

    // create style for header cells
    CellStyle style = workbook.createCellStyle();
    Font font = workbook.createFont();
    font.setFontName("Arial");
    //style.setFillForegroundColor(HSSFColor.BLUE.index);
    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    font.setBold(true);
    //font.setColor(HSSFColor.WHITE.index);
    style.setFont(font);


    // create header row
    Row header = sheet.createRow(0);
    header.createCell(0).setCellValue("Requirement");
    header.getCell(0).setCellStyle(style);
    header.createCell(1).setCellValue("Country");
    header.getCell(1).setCellStyle(style);
    header.createCell(2).setCellValue("Requirement Id");
    header.getCell(2).setCellStyle(style);
    header.createCell(3).setCellValue("Bill Rate");
    header.getCell(3).setCellStyle(style);
    header.createCell(4).setCellValue("Contract Type");
    header.getCell(4).setCellStyle(style);
    header.createCell(5).setCellValue("Cloient Details");
    header.getCell(5).setCellStyle(style);
    header.createCell(6).setCellValue("Priority");
    header.getCell(6).setCellStyle(style);
    header.createCell(7).setCellValue("Created Time");
    header.getCell(7).setCellStyle(style);
    header.createCell(8).setCellValue("Status");
    header.getCell(8).setCellStyle(style);
    header.createCell(9).setCellValue("Attachments");
    header.getCell(9).setCellStyle(style);


    int rowCount = 1;

    for(Requirement req : users){
        Row userRow =  sheet.createRow(rowCount++);
        userRow.createCell(0).setCellValue(req.getJobTitle());
        userRow.createCell(1).setCellValue(req.getCountry());
        userRow.createCell(2).setCellValue(req.getReqId());
        userRow.createCell(3).setCellValue(req.getBillRate());
        userRow.createCell(4).setCellValue(req.getContractType());
        userRow.createCell(5).setCellValue(req.getClientDetails());
        userRow.createCell(6).setCellValue(req.getPriority());
        userRow.createCell(7).setCellValue(req.getCreatedDate());
        userRow.createCell(8).setCellValue(req.isStatus());
        userRow.createCell(9).setCellValue(req.getFileName());

        }

}

}