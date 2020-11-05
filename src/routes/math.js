const {Router} = require('express');
const router = Router();
const mathFunctionsMolude = require('../math_functions/math_functions');

//router GET 
router.get('/:expression/:presicion', (req,res)=>{
    //required parameters
    const string_expression = req.params.expression;
    const string_presicion = req.params.presicion;
    //string square validation
    if (string_expression.indexOf('s')!=-1) {
        //function call to solve square root on math expression
        var math_resultSr = mathFunctionsMolude.square_root_function(string_expression);
        //function call to get significant digits
        var significant_digits = mathFunctionsMolude.get_significantDigits(math_resultSr, string_presicion);
        //send response to the client
       res.send("The result of math expression is: " + math_resultSr + " --- The significant digits are: " + significant_digits);
      
      }
      else{
          //function call to solve math expression
          var math_result = mathFunctionsMolude.math_expression_result(string_expression);
          //create a string object
          var math_stringR = (new String(math_result)).valueOf();
          //var initialization to store significant digits of the math expression
          var significantDigits = '';
          //function call to get significant digits
          significantDigits = mathFunctionsMolude.get_significantDigits(math_stringR,string_presicion);
          //send response to the client
          res.send("The result of math expression is: " + math_result + " --- The significant digits are: " + significantDigits);
      }

});



//router POST
router.post('/', (req,res)=>{
    console.log(req.body);
    //require values from the requested body
    const {expression,presicion} = req.body;
    var stringExpression = (new String(expression)).valueOf();
    var sting_significantDigits = (new String(presicion)).valueOf();
    //string square validation
    if (stringExpression.indexOf('s')!=-1) {
      var mathResult = mathFunctionsMolude.square_root_function(stringExpression);
      var significantDigits = mathFunctionsMolude.get_significantDigits(mathResult, sting_significantDigits);
     res.send("The result of math expression is: "  + mathResult + " --- The significant digits are: " + significantDigits);
    
    }
    else{
        //if the expression doesn't contain square root, ejecute math_expression_result function to get a expression result
        var finalResult = mathFunctionsMolude.math_expression_result(stringExpression);
        var stringMath_result = (new String(finalResult)).valueOf();
        var digits_notRoot_result = '';
        console.log("Resultado final: " + finalResult);
        //function call to get significant digits
        digits_notRoot_result = mathFunctionsMolude.get_significantDigits(stringMath_result,sting_significantDigits);
        res.send("The result of math expression is: " + finalResult + " --- The significant digits are: " + digits_notRoot_result);
    }
    

});


module.exports = router;