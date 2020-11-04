const {Router} = require('express');
const router = Router();

//router GET 
router.get('/:expression/:presicion', (req,res)=>{
    //required parameters
    const string_expression = req.params.expression;
    const string_presicion = req.params.presicion;
    //square root validation on string
    if (string_expression.indexOf('s')!=-1) {
        //function call to solve square root on math expression
        var result = square_root_function(string_expression,string_presicion);
        //function call to get significant numbers
        var significantNumbers = get_significantDigits(result, string_presicion);
        //send response to the client
       res.send("El resultao es " + result + " --- Cifras significativas: " + significantNumbers);
      
      }
      else{
          //function call to solve math expression
          var resultado_final = final(string_expression);
          //creating a string object
          var cadena_resultado = (new String(resultado_final)).valueOf();
          //var initialization to store significant nombers of the math expression
          var cantidad_digitos = '';
          console.log("Resultado final: " + resultado_final);
          //function call to get significant numbers
          cantidad_digitos = get_significantDigits(cadena_resultado,string_presicion);
          //send response to the client
          res.send('Resultado de la expresion ' + resultado_final + ' --- Cifras significativas: ' + cantidad_digitos);
      }

});



//router POST
router.post('/', (req,res)=>{
    console.log(req.body);
    //require values from the request body
    const {expression,presicion} = req.body;
    var cadena = (new String(expression)).valueOf();
    var cifra_cignificativa = (new String(presicion)).valueOf();
    //square root validation on string
    if (cadena.indexOf('s')!=-1) {
      var result = square_root_function(cadena,cifra_cignificativa);
      var cifras_significativas_raiz = get_significantDigits(result, cifra_cignificativa);
     res.send("El resultao es " + result + " --- Cifras significativas: " + cifras_significativas_raiz);
    
    }
    else{
        //if the expression not contain square root ejecute function call to get a expression result
        var resultado_final = final(cadena);
        var cadena_resultado = (new String(resultado_final)).valueOf();
        var cantidad_digitos = '';
        console.log("Resultado final: " + resultado_final);
        //function call to get significant numbers
        cantidad_digitos = get_significantDigits(cadena_resultado,cifra_cignificativa);

        res.send('Resultado de la expresion ' + resultado_final + ' --- Cifras significativas: ' + cantidad_digitos);
    }
    

});

//function to solve a square root of the mathematical expression
function square_root_function(cadena){
    //constants to get the position of the square root
    const i_position = cadena.indexOf('t');
    const end_position = cadena.indexOf(')');
    console.log(i_position);
    console.log(end_position);
    //get string inside square root expression
    var sub = cadena.substring(i_position+2,end_position);
    console.log(sub);
    console.log("existe raiz");
    console.log("existe raiz");
    console.log("Valor: " + sub);
    //solve the square root
    const resultado = eval("Math.sqrt("+sub+")");
    console.log(resultado);
    //get the mathematical expression that is before the square root
    const expresion_ant = cadena.substring(0,cadena.indexOf('s'));
    const sub_expresion_post = cadena.slice(cadena.indexOf('s'));
    //get the mathematical expression that is after the square root
    const expresion_post = sub_expresion_post.slice(sub_expresion_post.indexOf(')')+1);

    console.log("expresion anterior" + expresion_ant);
    console.log("expresion posterior" + expresion_post);
    //concatenate the entire mathematical expression
    const valor_concatenado = (expresion_ant+resultado+expresion_post);
    //solve the entire mathematical expression
    var valor_cadena_final = eval(valor_concatenado);
  
     console.log("EL RESULTADO FINAL CON RAIZ ES: " + valor_cadena_final);

    return valor_cadena_final;
}



//function to solve the entire mathematical expression
function final(valor_cadena) {

   var valor_cadena_final = eval(valor_cadena);

   return valor_cadena_final;
    
}

//function to get the significant digits of the result
function get_significantDigits (valor_cadena_final,cifra_cignificativa) {

     var cadena_valor = (new String(valor_cadena_final)).valueOf();
     var result = "";

     //conditional to evaluate decimal digits
     if (cadena_valor.includes('0.')){
     //get an array digits of the result 
     for (i=0;i<cadena_valor.length-1;i++) { 
        result += cadena_valor.charAt(i) 
        result += "-" 
 } 
    console.log(result);
    var array_digito = result.split("-");

    console.log(array_digito[1]);
     var posicion_digito = 0;
     var i = 0;   

    //get the position of the significant digits after the 0.
     while(array_digito[i]=='0'||array_digito[i]=='.' ||array_digito[i] == '-0'){
         posicion_digito = i;
         i++;
     }
     console.log("Posicion digito" + posicion_digito);
     console.log("recorrer digito" + cifra_cignificativa);
     
     var resultado2 = posicion_digito + eval(cifra_cignificativa+"+1")-1;
     console.log(resultado2);

     var array1 = [];
     //get array of the significat digits
     for(var j = posicion_digito+1;j<=resultado2;j++){

        array1 = array1.concat(array_digito[j]);

     }
    //return the array as a string
     return array1.join('');
   
    }
    else{
       var string_value = 0;
       string_value = parseFloat(cadena_valor);
       console.log(string_value);
        if(string_value>=1&&Number.isInteger(string_value)){
        var digito1 = cadena_valor.substring(0,eval(cifra_cignificativa));
        console.log("Valores significativos: " + digito1);

        return digito1;
        }
        else if(!Number.isInteger(string_value)&&string_value>1000) {
            var digito = cadena_valor.substring(0,eval(cifra_cignificativa));
        console.log("Valores significativossss: " + digito);

        return digito;
        }
        else {
            var digito = cadena_valor.substring(0,eval(cifra_cignificativa+"+1"));
        console.log("Valores significativossss222: " + digito);

        return digito;
        }
    }
     
}

module.exports = router;