class ApiResponse {
 constructor( statusCode , data , message="success" ){
  this.statusCodestatusCode = statusCode;
  this.data = data ;
  this.message=message 
  this.success = statusCode
 }
}