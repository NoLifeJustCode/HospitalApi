//process.env.NODE_ENV = 'dev';
/**
 * import chai and chai HTTP for http tests and methodsd
 */
const chai=require('chai')
const chaiHttp=require('chai-http')
/**
 * different Token and ids for testing dynamically 
 * these will updated dynamically
 */
let BearerToken='Bearer ';
let expiredToken='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjZiYWE4MjM0ZDgwMzk5NDFiNWQ0YiIsIm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsIm1vYmlsZSI6NTQ1NTU0NDQ1MSwiaWF0IjoxNTg5MDQ3OTAwLCJleHAiOjI1ODkwNDc5MDB9.W2cLfW2kIOuqgN1LlmXvQKY-gpZpVgkuENoOBnIb49w'
let patientId=1;
/**
 * setup server port and include chai expect to assert based on expectations
 */
const expect=chai.expect
const server='http://localhost:3000/';
/**
 * setup middleware to use chai http methods
 */
chai .use(chaiHttp)




/**
 * validate Doctor Registeration
 */



// test validation of unaccepted mobile formats 
it('mobile validation check',function(done){
    chai.request(server).post('api/v1/doctors/register').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'a@gmail.com',
        password:'1',
        mobile:'5654656556656',
        name:'a'
    })
    .end(function(err,res){
        expect(err).to.be.null;
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain(' mobile Validtion failed')
        done(err)
    })
})



// test validation of unaccepted email formats 
it('Invalid email validation ',function(done){
    chai.request(server).post('api/v1/doctors/register').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'a@',
        password:'1',
        mobile:'5654656556656',
        name:'a'
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('email validation failed')
        done(err)
    })
})








//test for incomplete form data
it('Incomplete Data ',function(done){
    chai.request(server).post('api/v1/doctors/register').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'a@gmail.com',
        
        mobile:'1234567892',
        name:'a'
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('Invalid')
        done(err)
    })
})



//test for successfull registeration with email and password
it('Successfull Registeration ',function(done){
    chai.request(server).post('api/v1/doctors/register').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'d@gmail.com',
        password:21,
        mobile:'1234567892',
        name:'a'
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('Successfull')
        done(err)
    })
})




//test for duplicate email to keep accounts unique
it('Duplicate email ',function(done){
    chai.request(server).post('api/v1/doctors/register').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'d@gmail.com',
        password:'1',
        mobile:'1234567892',
        name:'a'
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('duplicate key error')
        done(err)
    })
})



//test request if extra params are passed 
it('Successfull Registeration with Extra params ',function(done){
    chai.request(server).post('api/v1/doctors/register').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'d1@gmail.com',
        password:21,
        mobile:'1234567892',
        name:'a',
        age:52,
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('Successfull')
        done(err)
    })
})







/**
 * Tests for Login to Generate Token 
 */



 //test for invalid email login
it('Invalid Email Login  ',function(done){
    chai.request(server).post('api/v1/doctors/login').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'d1@gail.com',
        password:'1'
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(422)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('Invalid')
        done(err)
    })
})



//test for wrong password 
it('Invalid Password Login  ',function(done){
    chai.request(server).post('api/v1/doctors/login').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'d1@gmail.com',
        password:'12'
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(422)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('invalid')
        done(err)
    })
})





//test for missing params
it('Incomplete form Login  ',function(done){
    chai.request(server).post('api/v1/doctors/login').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'d1@gmail.com',
       
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(422)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('invalid')
        done(err)
    })
})




// Test for Successful  Token Generation
it('Generate Token  ',function(done){
    chai.request(server).post('api/v1/doctors/login').
    set('content-type','application/x-www-form-urlencoded')
    .send({
        email:'d1@gmail.com',
        password:21
    })
    .end(function(err,res){
        console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('token')
        expect(res.body.message).to.contain('successfull')
        BearerToken="Bearer "+res.body.token;
        done(err)
    })
})



/**
 * Tests for Secured Routes
 */



 //Test expired Token
 it(' Expired Token ',function(done){
    chai.request(server).post('api/v1/Authorize/doctors')
    .send('Authorization',expiredToken)
    .end(function(err,res){
        
        expect(err).to.be.null;
        expect(res).to.have.status(401)
        
        done(err)
    })
})


/**
 * Test for Registering patients
 */



 //Test with valid token but invalid mobile format
it('Register patient with valid Token Invalid mobile ',function(done){
    chai.request(server).post('api/v1/Authorize/patients/Register').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send({
        mobile:645654164,
        name:'b',
        Age:24
    })
    .end(function(err,res){
        
        expect(err).to.be.null;
        expect(res).to.have.property('text')
        expect(res.text).to.contain(' mobile Validtion failed')
        done(err)
    })
})




//Test with valid token but missing data params
it('Register patient with valid Token Invalid data ',function(done){
    chai.request(server).post('api/v1/Authorize/patients/Register').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send({
        mobile:645654164,
        name:'b',
        
    })
    .end(function(err,res){
        
        expect(err).to.be.null;
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('Invalid')
        done(err)
    })
})



//Test with valid token and valid form data
it('Register patient with valid Token and Valid form data ',function(done){
    chai.request(server).post('api/v1/Authorize/patients/Register').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send({
        mobile:6456541654,
        name:'b',
        Age:24
    })
    .end(function(err,res){
        
        console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        patientId=res.body._id
        
        done(err)
    })
})




/**
 * Create Report for patients
 */


 
 
 //test with invalid patient Id but can form ObjectId
 //test for invalid objectId yeilds similar result
it('Create Patient Report with Invalid patient Id',function(done){
    chai.request(server).post('api/v1/Authorize/patients/5eb6f4cdc7d83f2210d21d5a/create_report').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send({status:'Negative'})
    .end(function(err,res){
        
        console.log(res.text)
        expect(err).to.be.null;
        
        expect(res).to.have.property('text')
        expect(res.text).to.contain('doesn\'t exist')
        
        done(err)
    })
})






//test for Creating Report with missing Status parameter as no defaults set
it('Create Patient Report without Status ',function(done){
    chai.request(server).post('api/v1/Authorize/patients/'+patientId+'/create_report').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send()
    .end(function(err,res){
        
        console.log(res.text)
        expect(err).to.be.null;
        expect(res).to.have.status(422)
        expect(res).to.have.property('text')
        expect(res.text).to.contain('Incomplete')
        
        done(err)
    })
})





//test for Creating Report with Invalid Status params
it('Create Patient Report with valid Patient Id and UnAccecpted Status',function(done){
    chai.request(server).post('api/v1/Authorize/patients/'+patientId+'/create_report').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send({status:'Postive'})
    .end(function(err,res){
        
        console.log(res.text)
        expect(err).to.be.null;
        expect(res).to.have.status(504)
        expect(res).to.have.property('text')
        expect(res.text).to.contain('not a valid enum')
        
        done(err)
    })
})








//test for valid patient Report and status
it('Create Patient Report with valid Patient Id and Accecpted Status',function(done){
    chai.request(server).post('api/v1/Authorize/patients/'+patientId+'/create_report').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send({status:'Positive-Admit'})
    .end(function(err,res){
        
        console.log(res.text)
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        expect(res).to.have.property('text')
        
        
        done(err)
    })
})






/**
 * Get all reports w.r.t to patient id
 * patient id is passed as String params
 */



 //test for invalid patient Id
it('get Patient Report with Invalid patient Id',function(done){
    chai.request(server).get('api/v1/Authorize/patients/5eb6f4cdc7d83f2210d21d5a/all_reports').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send()
    .end(function(err,res){
        
        console.log(res.text)
        expect(err).to.be.null;
        
        expect(res).to.have.property('text')
        expect(res.text).to.contain('doesn\'t exist')
        
        done(err)
    })
})






//test for valid patient id 
it('Retreive Patient Report with valid Patient Id',function(done){
    chai.request(server).get('api/v1/Authorize/patients/'+patientId+'/all_reports').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send()
    .end(function(err,res){
        
        console.log(res.text)
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        expect(res).to.have.property('text')
        
        
        done(err)
    })
})


/**
 * Retrieve all reports of said status works for any status 
 */
it('Retreive Patient Report with valid Patient Id and Any Status',function(done){
    chai.request(server).get('api/v1/Authorize/reports/p').
    set('content-type','application/x-www-form-urlencoded')
    .set('Authorization',BearerToken)
    .send()
    .end(function(err,res){
        
        console.log(res.text)
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        expect(res).to.have.property('text')
        
        
        done(err)
    })
})