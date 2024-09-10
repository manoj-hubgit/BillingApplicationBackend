export const errorHandler =(statusCode,message)=>{
    const error =new Error();
    error.satausCode=statusCode;
    error.message=message;
    return error;
}