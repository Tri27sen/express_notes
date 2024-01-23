/*const asyncHandler = () =>{

}
*/
/*

// using try .... catch
const asyncHandler = (fn) => async (req , res , next ) => {
  try{
    await fn(req, res, next )
  }catch(error){
    res.status(err.code || 500).json({
      success:false ,
      message:err.message
    }) // it is caught in the catch block, and an error response with a status code and message is sent as JSON. easier for frontend developers 
  }

}

constructor() -- parameters are customizable 
*/

const asyncHandler = (requestHandler ) =>{
  return (req,res,next) =>{
    Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
  }
}
console.log("promise returned...")
exports.model = asyncHandler