package com.example.demo.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Candidate;



@Repository
public class CandidateDAO {
	
	  static final Logger logger=LoggerFactory.getLogger(CandidateDAO.class);

	private static final String DRIVERCLASS="org.sqlite.JDBC";  
	  
	public static Connection getConnection() {
		
		
		try {
			
			Class.forName(DRIVERCLASS);
		   	 con=DriverManager.getConnection(URL);
			
		}
		catch(Exception e) {
			logger.error("Connection Failed");
		}
		return con;
		
	}



	private static final String URL="jdbc:sqlite:C:/sqlite/mydata.db";
	
	private static final String INSERT="insert into candidate(fname ,lname ,email ,phone ,dob ,jobtitle ,city , state ,country ,pincode ,activestatus ,createddate ,createdby) values( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";
	
	private static final String UPDATE="update candidate set fname=?,lname=?,email=?,phone=?,dob=?,jobtitle=?,city=?,state=?,country=?,createddate=?,createdby=? where id=?";
	
	/* private static final String DELETE="delete from candidate where id=?"; */
	
	private static final String DELETE="update candidate set deleted='T' where id=?";
	
	private static final String SEARCH="select * from candidate where id=?";
	
	private static final String GETBYID="select * from candidate where activestatus=true and deleted='F' ";
	
	private static final String GETALL="select * from candidate where activestatus=true and deleted='F' order by id asc LIMIT ?, ?";
	
	private static final String GETALLCount="select count(*) as rowsCount from candidate where activestatus=true and deleted='F' order by id asc";
	
  	static Connection con;
	
	
	
	  
 /*   static {
        initEmps();
    }
  
    private static void initEmps() {
        Employee emp1 = new Employee(1L, "Emp1", "Employee1", "JavaDeveloper");
        Employee emp2 = new Employee(2L, "Emp2", "Employee2", "Jr.JavaDeveloper");
        Employee emp3 = new Employee(3L, "Emp3", "Employee3", "PythonDeveloper");
        Employee emp4 = new Employee(3L, "Emp4", "Employee4", "Jr.PythonDeveloper");

        empMap.put(emp1.getEmpId(), emp1);
        empMap.put(emp2.getEmpId(), emp2);
        empMap.put(emp3.getEmpId(), emp3);
        empMap.put(emp4.getEmpId(), emp4);

    }
  
    public Long getMaxEmpId() {
        Set<Long> keys = empMap.keySet();
        Long max = 0L;
        for (Long key : keys) {
            if (key > max) {
                max = key;
            }
        }
        return max;
    } */
	
	
	 
    public Candidate getCandidate(boolean activeStatus) throws Exception {
    	
    
    	logger.info("Entered Into 'getEmployee'");
    	
    	con=getConnection();
    	
    	Candidate cnd=new Candidate();
    	
    try {
    	
   	 PreparedStatement pst=con.prepareStatement(GETBYID);
   	ResultSet rs=pst.executeQuery();
		
		while(rs.next()) {
			
			cnd.setCandidateId(rs.getLong(1));
			cnd.setFirstName(rs.getString(2));
			cnd.setLastName(rs.getString(3));
			cnd.setEmail(rs.getString(4));
			cnd.setPhone(rs.getLong(5));
			cnd.setDob(rs.getString(6));
			cnd.setJobTitle(rs.getString(7));
			cnd.setCity(rs.getString(8));
			cnd.setState(rs.getString(9));
			cnd.setCountry(rs.getString(10));
			cnd.setCreatedDate(rs.getString(11));
			cnd.setCreatedBy(rs.getString(12));
		}	
   	 pst.close();
 
    }
    
    catch(Exception e) {
   	 
       logger.error("Error in 'addEmployee'");
   	e.printStackTrace();
   	
    }
    finally {
    	con.close();
    }
    
        return cnd;
    }
  
    
    
    
    
    public void  addCandidate(Candidate cnd) throws Exception {
    	
    	logger.info("Entered Into 'addEmployee'");
    	
       con=getConnection();
      
         try {
        	
        	
        	 
        	 if(cnd!=null && cnd.getCandidateId()==0) {
        		 
        	 
        	 PreparedStatement pst=con.prepareStatement(INSERT);
        	 
        	// pst.setLong  (1, cnd.getCandidateId()); 
        	 pst.setString(1, cnd.getFirstName());
        	 pst.setString(2, cnd.getLastName());
        	 pst.setString(3, cnd.getEmail());
        	 pst.setLong(4,   cnd.getPhone());
        	 pst.setString(5, cnd.getDob());
        	 pst.setString(6, cnd.getJobTitle());
        	 pst.setString(7, cnd.getCity());
        	 pst.setString(8, cnd.getState());
        	 pst.setString(9, cnd.getCountry());
        	 pst.setString(10, cnd.getPinCode());
        	 pst.setBoolean(11, cnd.isActiveStatus());
        	 pst.setString(12, cnd.getCreatedDate());
        	 pst.setString(13, cnd.getCreatedBy());        	
        	 
        	 pst.executeUpdate();
        	 System.out.println("Data Inserted SuccussFully");
        	 
        	 pst.close();
        	
        	 }else {
        		 updateCandidate(cnd);
        	 }
        	
        	
        			 
         }
         
         catch(Exception e) {
        	 
            logger.error("Error in 'addEmployee'");
        	e.printStackTrace();
         }
         
         finally {
        	 con.close();
         }
         
       }
   	
  	 
	
        
  
  
    
    public void updateCandidate(Candidate cnd) throws Exception {
    	logger.info("Entered Into 'updateEmployee'"+cnd.toString());
        
    	logger.info("Update Called for candidate ID : "+cnd.getCandidateId());
    	con=getConnection();
        
        	try {
        		
       //fname=?,lname=?,email=?,phone=?,dob=?,jobtitle=?,city=?,state=?,country=?,createddate=?,createdby=? where id=?
        		
        		
    			PreparedStatement pst=con.prepareStatement(UPDATE);
    			
    		 //pst.setLong  (1, cnd.getCandidateId()); 
           	 pst.setString(1, cnd.getFirstName());
           	 pst.setString(2, cnd.getLastName());
           	 pst.setString(3, cnd.getEmail());           	 
           	 pst.setLong(4, cnd.getPhone());
           	 pst.setString(5, cnd.getDob());
           	 pst.setString(6, cnd.getJobTitle());
           	pst.setString(7, cnd.getCity());
           	 pst.setString(8, cnd.getState());
           	 pst.setString(9, cnd.getCountry());           	 
           	pst.setString(10, cnd.getCreatedDate());
           	pst.setString(11, cnd.getCreatedBy());
           	 pst.setLong(12,cnd.getCandidateId());
           	 
    			
    			
    			pst.executeUpdate();
    			
    			System.out.println("Table Updated successfully");
        		
        	}
        	catch(Exception e){
        		
        		logger.error("Error in 'updateEmployee'");
        		e.printStackTrace();
        	}
			
        	finally {
        		con.close();
        	}
        	
        
       
    }
  
    public void deleteCandidate(Long  candidateId) throws Exception {
    	logger.info("Entered Into 'deleteEmployee'");
    	
    	con=getConnection();
    try {
			
			
			PreparedStatement pst=con.prepareStatement(DELETE);
			 pst.setLong(1,candidateId) ;	
			pst.executeUpdate();
			
			System.out.println("Table deleted successfully");
			
		}
		catch(Exception e) {
			
			System.out.println("Error in deleteValues");
			e.printStackTrace();
		}
    	
    finally {
    	con.close();
    }
    	
        
    }
    
   /* public void searchCandidate(Long  candidateId) throws Exception {
    	logger.info("Entered Into 'searchEmployee'");
    	
    	con=getConnection();
    try {
			
			
			PreparedStatement pst=con.prepareStatement(SEARCH);
			 pst.setLong(1,candidateId) ;	
			pst.executeUpdate();
			
			System.out.println("Table searched successfully");
			
		}
		catch(Exception e) {
			
			System.out.println("Error in searchingValues");
			e.printStackTrace();
		}
    	
    finally {
    	con.close();
    }
    	
    }   */  
  
    
    
    public List<Candidate> getAllCandidates(int pageNo, int pageSize) throws Exception {
    	logger.info("Entered Into 'getAllEmployees'");
    	
    	con=getConnection();
    	
    	List<Candidate> list=new ArrayList<>();
    	
    	try {
			
 			PreparedStatement pst=con.prepareStatement(GETALL);
 			pst.setInt(1,pageNo);
 			pst.setInt(2,pageSize);
 			ResultSet rs=pst.executeQuery();
 			 			 			
 			while(rs.next()) {
 				
 				Candidate cnd=new Candidate();
 				
 				cnd.setCandidateId(rs.getLong(1));
 				cnd.setFirstName(rs.getString(2));
 				cnd.setLastName(rs.getString(3));
 				cnd.setEmail(rs.getString(4));
 				cnd.setPhone(rs.getLong(5));
 				cnd.setDob(rs.getString(6));
 				cnd.setJobTitle(rs.getString(7));
 				cnd.setCity(rs.getString(8));
 				cnd.setState(rs.getString(9));
 				cnd.setCountry(rs.getString(10));
 				cnd.setCreatedDate(rs.getString(11));
 				cnd.setCreatedBy(rs.getString(14));
 				list.add(cnd);
 				
 			}	
 	   	 pst.close();
 		}
 		catch(Exception e) {
 			
 		}
    	
        return list;
    }
    
    public static Integer getAllCandidatesCount() throws Exception {
    	logger.info("Entered Into 'getAllEmployees'");
    	
    	con=getConnection();
    	
    	List<Candidate> list=new ArrayList<>();
    	int rowsCount=0;
    	try {
			
 			PreparedStatement pst=con.prepareStatement(GETALLCount); 			
 			ResultSet rs=pst.executeQuery(); 	
 			rowsCount = rs.getInt("rowsCount");  			 			
 				
 	   	 pst.close();
 		}
 		catch(Exception e) {
 			
 		}
    	
        return rowsCount;
    }





	public static List<Candidate> searchCandidate( int id)throws Exception {
		

    	logger.info("Entered Into 'getAllEmployees'");
    	
    	con=getConnection();
    	
    	List<Candidate> list=new ArrayList<>();
    	
    	try {
			
 			PreparedStatement pst=con.prepareStatement(SEARCH);
 			if(id>0)
 				pst.setLong(1,id);
 			ResultSet rs=pst.executeQuery();
 			
 			while(rs.next()) {
 				
 				Candidate cnd=new Candidate();
 				
 				cnd.setCandidateId(rs.getLong(1));
 				cnd.setFirstName(rs.getString(2));
 				cnd.setLastName(rs.getString(3));
 				cnd.setEmail(rs.getString(4));
 				cnd.setPhone(rs.getLong(5));
 				cnd.setDob(rs.getString(6));
 				cnd.setJobTitle(rs.getString(7));
 				cnd.setCity(rs.getString(8));
 				cnd.setState(rs.getString(9));
 				cnd.setCountry(rs.getString(10));
 				cnd.setCreatedDate(rs.getString(11));
 				cnd.setCreatedBy(rs.getString(14));
 				list.add(cnd);
 				
 			}	
 	   	 pst.close();
 		}
 		catch(Exception e) {
 			
 		}
    	
        return list;
    
	}
	
	public static void main(String[] args) throws Exception {
		/*
		 * List<Candidate> candidateList=null; try { candidateList = (List<Candidate>)
		 * searchCandidate(445); } catch (Exception e) { // TODO Auto-generated catch
		 * block e.printStackTrace(); } if(candidateList!=null &&
		 * candidateList.size()>0) {
		 * System.out.println("Result : "+candidateList.size()); }else {
		 * System.out.println("Result Not found "); }
		 */
		int rowsCount  = getAllCandidatesCount();
		System.out.println(rowsCount);
	}
    	  
    	 
   
    	
    }     
	





	



