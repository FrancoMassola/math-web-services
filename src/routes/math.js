const {Router} = require('express');
const router = Router();

//router GET 
router.get('/:expression/:presicion', (req,res)=>{
    //required parameters
    const string_expression = req.params.expression;
    const string_presicion = req.params.presicion;
    //string square validation
    if (string_expression.indexOf('s')!=-1) {
        //function call to solve square root on math expression
        var math_resultSr = square_root_function(string_expression);
        //function call to get significant digits
        var significant_digits = get_significantDigits(math_resultSr, string_presicion);
        //send response to the client
       res.send("El resultao es " + math_resultSr + " --- Cifras significativas: " + significant_digits);
      
      }
      else{
          //function call to solve math expression
          var math_result = math_expression_result(string_expression);
          //create a string object
          var math_stringR = (new String(math_result)).valueOf();
          //var initialization to store significant digits of the math expression
          var significantDigits = '';
          console.log("Resultado final: " + math_result);
          //function call to get significant digits
          significantDigits = get_significantDigits(math_stringR,string_presicion);
          //send response to the client
          res.send('Resultado de la expresion ' + math_result + ' --- Cifras significativas: ' + significantDigits);
      }

});



//router POST
router.post('/', (req,res)=>{
    console.log(req.body);
    //require values from the request body
    const {expression,presicion} = req.body;
    var stringExpression = (new String(expression)).valueOf();
    var sting_significantDigits = (new String(presicion)).valueOf();
    //string square validation
    if (stringExpression.indexOf('s')!=-1) {
      var mathResult = square_root_function(stringExpression);
      var significantDigits = get_significantDigits(mathResult, sting_significantDigits);
     res.send("El resultao es " + mathResult + " --- Cifras significativas: " + significantDigits);
    
    }
    else{
        //if the expression not contain square root ejecute math_expression_result function to get a expression result
        var finalResult = math_expression_result(stringExpression);
        var stringMath_result = (new String(finalResult)).valueOf();
        var digits_notRoot_result = '';
        console.log("Resultado final: " + finalResult);
        //function call to get significant digits
        digits_notRoot_result = get_significantDigits(stringMath_result,sting_significantDigits);

        res.send('Resultado de la expresion ' + finalResult + ' --- Cifras significativas: ' + digits_notRoot_result);
    }
    

});

//function to solve a square root of the mathematical expression
function square_root_function(valueStringExpression){
    //constants to get the position of the square root
    const i_position = valueStringExpression.indexOf('t');
    const end_position = valueStringExpression.indexOf(')');
    console.log(i_position);
    console.log(end_position);
    //get string inside square root expression
    var stringSquareRoot = valueStringExpression.substring(i_position+2,end_position);
    console.log(stringSquareRoot);
    console.log("existe raiz");
    console.log("existe raiz");
    console.log("Valor: " + stringSquareRoot);
    //solve the square root
    const result_square_root = eval("Math.sqrt("+stringSquareRoot+")");
    console.log(result_square_root);
    //get the mathematical expression that is before the square root
    const beforeExpression = valueStringExpression.substring(0,valueStringExpression.indexOf('s'));
    const sub_afterExpression = valueStringExpression.slice(valueStringExpression.indexOf('s'));
    //get the mathematical expression that is after the square root
    const afterExpression = sub_afterExpression.slice(sub_afterExpression.indexOf(')')+1);

    console.log("expresion anterior" + beforeExpression);
    console.log("expresion posterior" + afterExpression);
    //concatenate the entire mathematical expression
    const stringExpressionComplete = (beforeExpression+result_square_root+afterExpression);
    //solve the entire mathematical expression
    var result_math_complete = eval(stringExpressionComplete);
  
     console.log("EL RESULTADO FINAL CON RAIZ ES: " + result_math_complete);

    return result_math_complete;
}



//function to solve the entire mathematical expression
function math_expression_result(stringExpressionValue) {

   var finalExpressionValue = eval(stringExpressionValue);

   return finalExpressionValue;
    
}

//function to get the significant digits of the result
function get_significantDigits (string_finalValue,significativeDigits) {

     var string_resultValue = (new String(string_finalValue)).valueOf();
     var result = "";

     //conditional to evaluate decimal digits
     if (string_resultValue.includes('0.')){
     //get an array digits of the result 
     for (i=0;i<string_resultValue.length-1;i++) { 
        result += string_resultValue.charAt(i) 
        result += "-" 
 } 
    console.log(result);
    var digistArray = result.split("-");

    console.log(digistArray[1]);
     var digitPosition = 0;
     var i = 0;   

    //get the position of the significant digits after the 0.
     while(digistArray[i]=='0'||digistArray[i]=='.' ||digistArray[i] == '-0'){
         digitPosition = i;
         i++;
     }
     console.log("Posicion digito" + digitPosition);
     console.log("recorrer digito" + significativeDigits);
     
     var totalDigitResult = digitPosition + eval(significativeDigits+"+1")-1;
     console.log(totalDigitResult);

     var finalArray = [];
     //get array of the significat digits
     for(var j = digitPosition+1;j<=totalDigitResult;j++){

        finalArray = finalArray.concat(digistArray[j]);

     }
    //return the array as a string
     return finalArray.join('');
   
    }
    else{
       var resultValue = 0;
       //convert the result value to float to evaluate the conditionals 
       resultValue = parseFloat(string_resultValue);
       console.log(resultValue);
        if(resultValue>=1&&Number.isInteger(resultValue)){
        var sDigits = string_resultValue.substring(0,eval(significativeDigits));
        console.log("Valores significativos: " + sDigits);

        return sDigits;
        }
        else if(!Number.isInteger(resultValue)&&resultValue>1000) {
            var sDigits2 = string_resultValue.substring(0,eval(significativeDigits));
        console.log("Valores significativoss: " + sDigits2);

        return sDigits2;
        }
        else {
            var sDigits3 = string_resultValue.substring(0,eval(significativeDigits+"+1"));
        console.log("Valores significativossss222: " + sDigits3);

        return sDigits3;
        }
    }
     
}

module.exports = router;