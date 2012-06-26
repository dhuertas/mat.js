matjs
=====

Yet another javascript matrix library.

Here are some examples of how to use it. Enjoy!

**Example**

```
var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var square = new MAT(5, 5, values);

var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
var tall = new MAT(7, 5, values);
```

**Product**
```
var result = tall.product(square);

console.log(result.toString());
```

**Convolution**
```
var h = [1,0.5],
    x = [1,2,1,-1],
    H = new MAT(h.length,1,h), X = new MAT(x.length,1,x);

var Y = H.toeplitz(x.length).product(X);

console.log(Y.toString());
```

**Solving system of linear equations**

Equations:
* 3x + 2y -  z =  1
* 2x - 2y + 4z = -2
* -x +0.5y - z =  0

```
var coef = [3, 2, -1, 2, -2, 4,-1,0.5,-1], 
    cons = [1,-2,0];
    
var equations = new MAT(3,3,coef);

var result = equations.solve(cons);

console.log(result.toString());
```