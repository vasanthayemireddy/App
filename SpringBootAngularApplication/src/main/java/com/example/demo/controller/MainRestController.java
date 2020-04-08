package com.example.demo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.CandidateDAO;
import com.example.demo.model.Candidate;
import com.example.demo.model.Employee;
import com.example.demo.model.EmployeeForm;



@RestController
public class MainRestController {
	
  static final Logger logger=LoggerFactory.getLogger(MainRestController.class);
	
	@Autowired
    private CandidateDAO employeeDAO;
  
  
   
    @RequestMapping(value = "/getemployee/{pageNo}/{pageSize}",   method = RequestMethod.GET,    produces = { MediaType.APPLICATION_JSON_VALUE,  MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public List<Candidate> getAllCandidates(@PathVariable("pageNo") int pageNo,@PathVariable("pageSize") int pageSize) throws Exception {
    	logger.info("Entered Into 'getCadidtes List'");
        List<Candidate> list = employeeDAO.getAllCandidates(pageNo,pageSize);
        return list;
    }
    
    @RequestMapping(value = "/getemployeeCount",   method = RequestMethod.GET,    produces = { MediaType.APPLICATION_JSON_VALUE,  MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public Integer getAllCandidatesCount() throws Exception {
    	logger.info("Entered Into 'getCadidtes List'");
        Integer rowsCount = employeeDAO.getAllCandidatesCount();
        return rowsCount;
    }
  
    
    
    @RequestMapping(value = "/employee/{empId}", method = RequestMethod.GET,produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public Candidate getEmployee(@PathVariable("empId") boolean activeStatus) throws Exception {
    	logger.info("Entered Into 'getEmployeeById'");
    	
        return employeeDAO.getCandidate(activeStatus);
    }
  
    
    
   //Save Employee  Method
    
    @RequestMapping(value = "/saveemployee",   method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE,  MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public Candidate addCandidate(@RequestBody Candidate cnd) throws Exception {
    	
    	logger.info("Entered Into 'addEmployee'");
  
        System.out.println("(Service Side) Creating employee with empNo: " + cnd.getCandidateId());
        
        
       // List<Candidate> list=getAllCandidates();
        
             employeeDAO.addCandidate(cnd);
			return  cnd; 
    }
    
   // search employee
    @RequestMapping(value = "/searchemployee/{empId}",   method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE,  MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public List<Candidate> searchCandidate(@PathVariable("empId") int id) throws Exception {
    	
    	logger.info("Entered Into 'searchEmployee'");
    	List<Candidate> list=null;
        System.out.println("(Service Side) Searching employee with Id: " + id);
        if(id>0) {
        	list=employeeDAO.searchCandidate(id);
        }else {
        	//list=employeeDAO.getAllCandidates();
        }
        
        return list;
    }
    
    
    
    
    // Update Employee
    
    @RequestMapping(value = "/employee", method = RequestMethod.PUT,  produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public void updateCandidate(@RequestBody Candidate cnd) throws Exception {
    	System.out.println("Edit Candidate entered...");
    	logger.info("Entered Into 'updateEmployee'");
    	employeeDAO.updateCandidate(cnd);
        System.out.println("(Service Side) Editing employee with Id: " + cnd.getCandidateId());
  
    }
  
   
    @RequestMapping(value = "/deleteemployee/{empId}",  method = RequestMethod.DELETE,  produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public void deleteCandidate(@PathVariable("empId") Long candidateId) throws Exception {
    	logger.info("Entered Into 'deleteEmployee'");
        System.out.println("(Service Side) Deleting employee with Id: " + candidateId);
  
        employeeDAO.deleteCandidate(candidateId);
    }

}
