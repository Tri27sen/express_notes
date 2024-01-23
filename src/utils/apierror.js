//to define a custom error class named ApiError that extends the built-in Error class in JavaScript. This is a common practice when you want to create custom error types to handle specific situations in your application. (overwrite)


//In object-oriented programming, a constructor is a special method or function that is automatically called when an instance of a class is created. It initializes the object's properties and sets up any necessary initial state

class ApiError extends Error{
  constructor( //message 
    statusCode ,
    message = "wrong", 
    errors = [],
    stack= ""   //stack trace associated with error
  ){
    super(message)
    this.statusCode= statusCode 
    this.data= null
    this.message = message
    this.success = false //error message 
    this.errors = errors

    if(stack){    // specifying the statck
      this.stack = stack 
    }else{
      Error.captureStackTrace(this , this.constructor)
    }
  }
}

exports.model= ApiError
/*
class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code || 500; // Default to a generic server error code if not provided
    this.name = 'ApiError';
  }
}

The constructor method is called when you create a new instance of the ApiError class.

It takes two parameters, message and code.

The super(message) is used to call the constructor of the parent class (Error in this case) and pass the message parameter to it. This is necessary because Error is a built-in class in JavaScript.

The this.code = code || 500 line sets the code property of the ApiError instance. If no code is provided, it defaults to 500.

The this.name = 'ApiError' line sets the name property of the instance for better identification of the error type.*/