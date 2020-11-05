# Introduction

math-web-services is a RESTful API to solve the math expression and find the significant digits of the expression result.

## Use Cases

This API could be used like a calculator.

## Methods 

GET as the method be use like this format: 

Local: http://localhost:port/api/math/mathExpression/precisionValue

Remote: https://math-web-services.rj.r.appspot.com/api/math/mathExpression/precisionValue

POST as the method be use like this format:

{

  "expression": "mathExpression",
 
  "precision": "precisionValue"
  
}


