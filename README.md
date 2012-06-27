mat.js
=====

**Javascript Matrix Library**

Yet another javascript matrix library. Here are some examples of how to use it. Enjoy!

**Usage**

Download the library and include it in your html.

```
<script src="js/mat.js"></script>
```

Then you are ready to go. The following code creates two matrices:

```
var values = [
     1, 2, 3, 4, 5,
     6, 7, 8, 9,10,
    11,12,13,14,15,
    16,17,18,19,20,
    21,22,23,24,25];
    
var square = new MAT(5, 5, values);

var values = [
     1, 2, 3, 4, 5,
     6, 7, 8, 9,10,
    11,12,13,14,15,
    16,17,18,19,20,
    21,22,23,24,25,
    26,27,28,29,30,
    31,32,33,34,35];

var tall = new MAT(7, 5, values);
```

**Matrix product**
```
var result = tall.product(square);

console.log(result.toString());
```

**Convolution**

Discrete convolution between two vectors:

```
var h = [1, 0.5],
    x = [1, 2, 1, -1],
    H = new MAT(h.length, 1, h), 
    X = new MAT(x.length, 1, x);

var Y = H.toToeplitz(x.length).product(X);

console.log(Y.toString());
```

**Solving system of linear equations**

Equations:
* 3x + 2y -  z =  1
* 2x - 2y + 4z = -2
* -x + 0.5y - z =  0

```
var coef = [
     3, 2, -1, 
     2, -2, 4, 
    -1, 0.5, -1]; 
    
var const = [1, -2, 0];
    
var equations = new MAT(3, 3, coef);

var result = equations.solve(const);

console.log(result.toString());
```
**Complex numbers**

Did I mention that you can also use complex numbers? Give it a try!

```
var values = [
    [2,7], [2,-1], 
    [4,-9], [8,-2]];

var complex = new MAT(2, 2, values);

console.log(complex.det());
```

**Available functions**

* add
* det
* diag
* eigenValues
* eigenVectors
* gaussElimination
* gramSchmidt
* hadamartProduct
* hermitian
* identity
* inverse
* minor
* norm
* pNorm
* product
* pInverse (Moore-Penrose pseudoinverse)
* qr (QR decomposition)
* scalarProduct
* solve
* sub
* toToeplitz
* trace
* transpose





