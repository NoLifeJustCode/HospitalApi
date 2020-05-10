/*
 * Setup and Execution
 */

 1.make sure 'pwd' is project directory
 2.use 'npm install' to install all dependencies needed for the project to execute without errors
 3.use 'npm start' to start the server 
 4.use 'npm test' to test the server with predefined tests 


 /*
  *  Project Directory and Structure
  */
  1.models
        contains all the model Schema connected to HospitalAPI Database
        Schemas contained:
            Doctors Schema : This Schema guides the creating ,updating,deletion of Doctor instances
            Patients Schema : This Schema guides the creating ,updating,deletion of Patient instances
            Reports Schema : This Schema guides the creating ,updating,deletion of Reports instances


  2. Controllers:
         contains Controller required to router endpoint to respective actions
         Controllers:
                DoctorController: 
                    This Controller contains actions related to 
                    1.Register or Signup of a Doctor
                    2.Login to generate the jwt for api
                    3.Filter Reports based on status
                PatientController:
                    This Controller contains actions related to 
                    1.Register or Signup of patients
                    2.Create Report for a patient provided by id
                    3.Retrieve all reports of a patient given id
  3.Routes:
         contains Routes need to route endpoints to respective actions
         api:
            All api are routed thru this route
            v1:
                versioning the api 
                Authorize:
                    All routes with Authorize are Authenticated to provide acess to routes
                UnAuthenticated
                    UnAuthenticated Routes are passed to this route
  4.config:
        contains configuration files to setup the basic properties need for use
        passport-jwt:
            This file contains setup of passport jwt
        mongoose_HospitalDB:
            This file contains config of database Host HospitalAPI
        setupProperties:
            This file contains Setup Properties needed across the project
  5.test
        contains files related to test
/*
 *  Endpoints and responses
 */

 1.Register Doctor 
    url:
        localhost:3000/api/v1/doctors/register
    headers:
        content-type: application/x-www-form-urlencoded
    method:
        POST
    params:
        name:String
        mobile:10 digit Number 
        email:unique Identifier
        password:String
    Validations:
        Email:format and uniqueness
        mobile:format
    Response:
        Json

        



 2.Login/Generate Token
    url:
        localhost:3000/api/v1/doctors/login
    headers:
        content-type: application/x-www-form-urlencoded
    method:
        POST
    params:
        
        email:
        password:
    Validations:
        Email:format 
    Response
        Json with token


 Secured Routes all Routes are Authenticated using Doctors jwt
 
 3.Create Patient Record or Retrieve if exists
    url:
        localhost:3000/api/v1/Authorize/patients/register
    headers:
        content-type: application/x-www-form-urlencoded
    method:
        POST
    params:
        
        name:
        mobile:
        Age:
    Validations:
        mobile:format 
    Response
        Json with ref to patient record

 4.Create Report of patient with id or update status of report if report already exists
    url:
        localhost:3000/api/v1/Authorize/patients/:pateintId/create_report
    headers:
        content-type: application/x-www-form-urlencoded
    method:
        POST
    params:
        
       status:['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit'];
    Validations:
       status:enum 
    Response
        Json with report data



 5.Retrieve Reports of patient with id
    url:
        localhost:3000/api/v1/Authorize/patients/:patientId/all_reports
    headers:
        content-type: application/x-www-form-urlencoded
    method:
        POST
    params:
        
    Validations:
       
    Response
        Json with list of reports


 5.filter Reports based on status
    url:
        localhost:3000/api/v1/Authorize/reports/:status
    headers:
        content-type: application/x-www-form-urlencoded
    method:
        POST
    params:
        
       
    Validations:
       
    Response
        Json with report data



Notes:
    1.Report Update works only if a report with the same patientId and doctorId exists
    2.filter Reports based on status doesn't validate type of status
    
        

    
