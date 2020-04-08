/*package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.demo.model.Requirement;

public class CsvView extends AbstractCsvView {
@Override
protected void buildCsvDocument(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {

    response.setHeader("Content-Disposition", "attachment; filename=\"my-csv-file.csv\"");

    List<Requirement> users = (List<Requirement>) model.get("users");
    String[] header = {"Requirement","Country","Requirement Id","Bill Rate","Contract Type","Client Details","Priority","Created Time", "Status","Attachments"};
    ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(),
            CsvPreference.STANDARD_PREFERENCE);

    csvWriter.writeHeader(header);

    for(Requirement user : users){
        csvWriter.write(user, header);
    }
    csvWriter.close();


}
}*/