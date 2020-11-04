const {Router} = require('express');
const router = Router();

//router GET to solve a mathematical expression as the first parameter and respond with the significant numbers of the expression result as the second parameter
router.get('/:expression/:presicion', (req,res)=>{
    //required parameters
    const string_expression = req.params.expression;
    const string_presicion = req.params.presicion;
    //square root validation on string
    if (string_expression.indexOf('s')!=-1) {
        //function call to solve square root on math expression
        var result = square_root_function(string_expression,string_presicion);
        //function call to get significant numbers
        var significantNumbers = cifras_cignificativas_raiz(result, string_presicion);
        //send response to client
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
          cantidad_digitos = cifras_cignificativas_raiz(cadena_resultado,string_presicion);
          //send response to client
          res.send('Resultado de la expresion ' + resultado_final + ' --- Cifras significativas: ' + cantidad_digitos);
      }

});



//router POST
router.post('/', (req,res)=>{
    console.log(req.body);
    //require values from 
    const {expression,presicion} = req.body;
    var cadena = (new String(expression)).valueOf();
    var cifra_cignificativa = (new String(presicion)).valueOf();
    if (cadena.indexOf('s')!=-1) {
      var result = square_root_function(cadena,cifra_cignificativa);
      var cifras_significativas_raiz = cifras_cignificativas_raiz(result, cifra_cignificativa);
     res.send("El resultao es " + result + " --- Cifras significativas: " + cifras_significativas_raiz);
    
    }
    else{
        var resultado_final = final(cadena);
        var cadena_resultado = (new String(resultado_final)).valueOf();
        var cantidad_digitos = '';
        console.log("Resultado final: " + resultado_final);
        cantidad_digitos = cifras_cignificativas_raiz(cadena_resultado,cifra_cignificativa);

        res.send('Resultado de la expresion ' + resultado_final + ' --- Cifras significativas: ' + cantidad_digitos);
    }
    

});

function square_root_function(cadena){
    const i_position = cadena.indexOf('t');
    const end_position = cadena.indexOf(')');
    const div_position = cadena.indexOf('/');
    console.log("posicion dividir" + div_position);
    console.log(i_position);
    console.log(end_position);
    var sub = cadena.substring(i_position+2,end_position);
    console.log(sub);
    console.log("existe raiz");
    console.log("existe raiz");
    console.log("Valor: " + sub);
    const resultado = eval("Math.sqrt("+sub+")");
    console.log(resultado);

    let op_anterior = cadena.indexOf('s');
    let op_siguiente = cadena.indexOf(')');
    op_anterior-=1;
    op_siguiente+=1;
    const expresion_ant = cadena.substring(0,cadena.indexOf('s'));
    const sub_expresion_post = cadena.slice(cadena.indexOf('s'));
    const expresion_post = sub_expresion_post.slice(sub_expresion_post.indexOf(')')+1);

    console.log("expresion anterior" + expresion_ant);
    console.log("expresion posterior" + expresion_post);

    const valor_concatenado = (expresion_ant+resultado+expresion_post);

    var valor_cadena_final = eval(valor_concatenado);
  
     console.log("EL RESULTADO FINAL CON RAIZ ES: " + valor_cadena_final);

    return valor_cadena_final;
}




function final(valor_cadena) {

   var valor_cadena_final = eval(valor_cadena);

   return valor_cadena_final;
    
}


function cifras_cignificativas_raiz (valor_cadena_final,cifra_cignificativa) {

     var cadena_valor = (new String(valor_cadena_final)).valueOf();
     var result = "";

     if (cadena_valor.includes('0.')){
     for (i=0;i<cadena_valor.length-1;i++) { 
        result += cadena_valor.charAt(i) 
        result += "-" 
 } 
    console.log(result);
    var array_digito = result.split("-");

    console.log(array_digito[1]);
     var posicion_digito = 0;
     var i = 0;   


     while(array_digito[i]=='0'||array_digito[i]=='.' ||array_digito[i] == '-0'){
         posicion_digito = i;
         i++;
     }
     console.log("Posicion digito" + posicion_digito);
     console.log("recorrer digito" + cifra_cignificativa);
     
     var resultado2 = posicion_digito + eval(cifra_cignificativa+"+1")-1;
     console.log(resultado2);

     var array1 = [];
     for(var j = posicion_digito+1;j<=resultado2;j++){

        array1 = array1.concat(array_digito[j]);

     }

     return array1.join('');
   
    }
    else{
       
        if(!cadena_valor.includes('0.')){
        var digito1 = cadena_valor.substring(0,eval(cifra_cignificativa));
        console.log("Valores significativos: " + digito);

        return digito1;
        }
        else {
            var digito = cadena_valor.substring(0,eval(cifra_cignificativa));
        console.log("Valores significativos: " + digito);

        return digito+1;
        }
    }
     
}

module.exports = router;