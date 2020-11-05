 
 module.exports = {
 
 //function to solve the entire mathematical expression
 math_expression_result: function (stringExpressionValue) {

    var finalExpressionValue = eval(stringExpressionValue);
 
    return finalExpressionValue;
     
 },

 //function to solve a square root of the mathematical expression
 square_root_function :function (valueStringExpression){
    
    //constants to get the position of the square root
    const i_position = valueStringExpression.indexOf("t");
    const end_position = valueStringExpression.indexOf(")");
    //get string inside square root expression
    var stringSquareRoot = valueStringExpression.substring(i_position + 2,end_position);
    //solve the square root
    const result_square_root = eval("Math.sqrt(" + stringSquareRoot + ")");
    //get the mathematical expression that is before the square root
    const beforeExpression = valueStringExpression.substring(0,valueStringExpression.indexOf("s"));
    const sub_afterExpression = valueStringExpression.slice(valueStringExpression.indexOf("s"));
    //get the mathematical expression that is after the square root
    const afterExpression = sub_afterExpression.slice(sub_afterExpression.indexOf(")") + 1);
    //concatenate the entire mathematical expression
    const stringExpressionComplete = beforeExpression + result_square_root + afterExpression;
    //solve the entire mathematical expression
    var result_math_complete = eval(stringExpressionComplete);
  
    return result_math_complete;
  },
   
  //function to get the significant digits of the result
  get_significantDigits :function (string_finalValue,significativeDigits) {

    var string_resultValue = (new String(string_finalValue)).valueOf();
    var result = "";
    //conditional to evaluate decimal digits
    if (string_resultValue.includes('0.')){
    //get an array digits of the result 
    for (i=0;i<string_resultValue.length-1;i++) { 
       result += string_resultValue.charAt(i) 
       result += "-" 
   } 
    var arrayDigits = result.split("-");
    var digitPosition = 0;
    var i = 0;   
   //get the position of the significant digits after the 0.
    while(arrayDigits[i]=='0'||arrayDigits[i]=='.' ||arrayDigits[i] == '-0'){
        digitPosition = i;
        i++;
    }
    var totalDigitResult = digitPosition + eval(significativeDigits+"+1")-1;
    var finalArray = [];
    //get array of the significat digits
    for(var j = digitPosition+1;j<=totalDigitResult;j++){
       finalArray = finalArray.concat(arrayDigits[j]);
    }
   //return the array as a string
    return finalArray.join('');
   }
   else{
       var resultValue = 0;
       //convert the result value to float to evaluate the conditionals 
       resultValue = parseFloat(string_resultValue);
       if(resultValue>=1&&Number.isInteger(resultValue)){
       var sDigits = string_resultValue.substring(0,eval(significativeDigits));
       return sDigits;
       }
       else if(!Number.isInteger(resultValue)&&resultValue>1000) {
           var sDigits2 = string_resultValue.substring(0,eval(significativeDigits));
       return sDigits2;
       }
       else {
           var sDigits3 = string_resultValue.substring(0,eval(significativeDigits+"+1"));
       return sDigits3;
       }
   }
    
}

 }
