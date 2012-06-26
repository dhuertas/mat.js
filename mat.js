function MAT(r, c, v) {
	
	this.rows = r;
	
	this.cols = c;
	
	this.values = v;
	
}

/* 
 * Addition: a + b
 */
MAT.prototype.a = function(a, b) {
		
	if (a instanceof Array && b instanceof Array) {
		
		return [a[0]+b[0], a[1]+b[1]];
	
	} else if (a instanceof Array && ! b instanceof Array) {
		
		return [a[0]+b, a[1]];
	
	} else if ( ! a instanceof Array && b instanceof Array) {
		
		return [a+b[0], b[1]];
	
	} else {
		
		return a+b;
	
	}
	
}
	
/* 
 * Subtraction: a - b
 */
MAT.prototype.s = function(a, b) {
	
	if (a instanceof Array && b instanceof Array) {
		
		return [a[0]-b[0], a[1]-b[1]];
	
	} else if (a instanceof Array && ! b instanceof Array) {
		
		return [a[0]-b, a[1]];
	
	} else if ( ! a instanceof Array && b instanceof Array) {
		
		return [a-b[0], b[1]];
	
	} else {
		
		return a-b;
	
	}
	
}

/* 
 * Multiplication: a * b 
 */
MAT.prototype.m = function(a, b) {
	
	if (a instanceof Array && b instanceof Array) {
		
		return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
	
	} else if (a instanceof Array && ! b instanceof Array) {
		
		return [a[0]*b, a[1]*b];
	
	} else if ( ! a instanceof Array && b instanceof Array) {
		
		return [a*b[0], a*b[1]];
	
	} else {
		
		return a*b;
	
	}
	
}

/*	
 * Division: a / b
 */
MAT.prototype.d = function(a, b) {
	
	if (a instanceof Array && b instanceof Array) {
		
		if (b[0] === 0 && b[1] === 0) {
			
			console.log("division by 0");
		
		}
		
		return [
			( a[0]*b[0]+a[1]*b[1] ) / ( b[0]*b[0]+b[1]*b[1] ),
			( a[1]*b[0]-a[0]*b[1] ) / ( b[0]*b[0]+b[1]*b[1] )];
	
	} else if (a instanceof Array && ! b instanceof Array) {
		
		if (b === 0) {
			
			console.log("division by 0");
		
		}
		
		return [a[0]/b, a[1]/b];
	
	} else if ( ! a instanceof Array && b instanceof Array) {
		
		if (b[0] === 0 && b[1] === 0) {
		
			console.log("division by 0");
	
		}
		
		return [
			a*b[0] / ( b[0]*b[0]+b[1]*b[1] ),
			-a*b[1] / ( b[0]*b[0]+b[1]*b[1] )];
	
	} else {
		
		if (b === 0) {
			
			console.log("division by 0");
		
		}
		
		return a/b;
	
	}
	
}
	
/*
 * Conjugate: a -i*b 
 */
MAT.prototype.c = function(a) {

	if (a instanceof Array) {
		
		return [a[0],-a[1]];
	
	} else {
		
		return a;
	
	}
	
}

/*
 * Modulus
 */
MAT.prototype.mod = function(a) {
	
	if (a instanceof Array) {
		
		return Math.sqrt(a[0]*a[0]+a[1]*a[1]);
	
	} else {
		
		return Math.abs(a);
	
	}
	
}

/*
 * toArray
 * @return: array
 */
MAT.prototype.toArray = function () {
	
	var res = [], n = this.values.length;
	
	for (var i = 0; i < n; i++) {
		
		res.push(this.values[i]);
	
	}
	
	return res;

}

/* ---------- Gets and sets ---------- */

MAT.prototype.getColumn = function(j) {
	
	var res = [];
	
	if (this.cols > j && j >= 0) {
		
		for (var i = 0; i < this.rows; i++) {
			
			res.push(this.values[this.cols*i+j]);
		
		}
	
	} else {
		
		for (var i = 0; i < this.rows; i++) {
			
			res.push(0);
		
		}
	
	}
	
	return (new MAT(this.rows, 1, res));

}

MAT.prototype.getColumns = function() {
	
	return this.cols;

}

MAT.prototype.getLength = function() {
	
	return this.values.length;

}

MAT.prototype.getRow = function(i) {
	
	var res = [];
	
	if (this.rows > i && i >= 0) {
		
		for (var j = 0; j < this.cols; j++) {
			
			res.push(this.values[this.cols*i+j]);
		
		}
	
	} else {
		
		for (var j = 0; j < this.cols; j++) {
			
			res.push(0);
		
		}
		
	}
	
	return (new MAT(1, this.cols, res));

}

MAT.prototype.getRows = function() {
	
	return this.rows;

}

MAT.prototype.getShape = function() {
	
	return [this.rows, this.cols];

}

MAT.prototype.getValue = function(a,b) {
	
	return this.values[a*this.cols+b];

}

MAT.prototype.getValues = function() {
	
	var n = this.values.length, res = [];
	
	for (var i = 0; i < n; i++) {
		
		res.push(this.values[i]);
	
	}
	
	return res;
	
}

MAT.prototype.setRows = function(a) {
	
	this.rows = a;
	
	return this;

}

MAT.prototype.setColumns = function(a) {
	
	this.cols = a;
	
	return this;

}

MAT.prototype.setValue = function(a,b,c) {
	
	this.values[a*this.cols+b] = c;
	
	return this;

}

/* ---------- Other methods ---------- */

MAT.prototype.isSquare = function() {
	
	return (this.cols === this.rows);

}

/* ---------- Main functions ---------- */

/*
 * @param: matrix object
 * @return: matrix object (X+A)
 */
MAT.prototype.add = function(a) {
	
	var values = [];
	
	if (a.getColumns() === this.cols && a.getRows() === this.rows) {
		
		for (var i = 0; i < this.rows; i++) {
			
			for (var j = 0; j < this.cols; j++) {
				
				values.push(this.a(this.getValue(i, j), a.getValue(i, j)));
			
			}
		
		}
	
	}
	
	return new MAT(this.rows, this.cols, values);

}

/*
 * @param: matrix object
 * @return: matrix object (X-A)
 */
MAT.prototype.sub = function(a) {
	
	var values = [];
	
	if (a.getColumns() === this.cols && a.getRows() === this.rows) {
		
		for (var i = 0; i < this.rows; i++) {
			
			for (var j = 0; j < this.cols; j++) {
				
				values.push(this.s(this.getValue(i, j),a.getValue(i, j)));
			
			}
		
		}
	
	}
	
	return new MAT(this.rows, this.cols, values);

}

/*
 * @param: matrix object
 * @return: matrix object (X*A)
 */
MAT.prototype.product = function(a) {

	var temp = 0,
		values = [];
	
	if (a.getRows() === this.cols) {
		
		for (var i = 0; i < this.rows; i++) {
			
			for (var j = 0; j < this.cols; j++) {
				
				temp = 0;
				
				for (var k = 0; k < this.cols; k++) {
					
					temp = this.a(temp, this.m(this.values[this.cols*i+k], a.getValue(k, j)));
				
				}
				
				values.push(temp);
			
			}
		
		}
	
	}

	return new MAT(this.rows, a.getColumns(), values);

}

/*
 * @param: float
 * @return: matrix object (a*X)
 */
MAT.prototype.sProduct = function(a) {
	
	var values = [];

	for (var i = 0; i < this.rows; i++) {
		
		for (var j = 0; j < this.cols; j++) {
			
			values.push(this.m(a, this.getValue(i, j)));
		
		}
	
	}
	
	return new MAT(this.rows, this.cols, values);

}

/*
 * @return: matrix object
 */
MAT.prototype.transpose = function() {
	
	var values = [];
	
	for (var i = 0; i < this.cols; i++) {
		
		for (var j = 0; j < this.rows; j++) {
			
			values.push(this.values[this.cols*j+i]);
		
		}
	
	}
	
	return new MAT(this.rows, this.cols, values);

}

/*
 * @return: matrix object
 */
MAT.prototype.hermitian = function() {
	
	var values = [];
	
	for (var i = 0; i < this.cols; i++) {
		
		for (var j = 0; j < this.rows; j++) {
			
			values.push(this.c(this.values[this.cols*j+i]));
		
		}
	
	}
	
	return new MAT(this.cols, this.rows, values);

}

/*
 * @return: float
 */
MAT.prototype.trace = function() {
	
	var result = 0;
	
	if (this.isSquare()) {
		
		for (var i = 0; i < this.cols; i++) {
			
			result = this.a(result, this.getValue(i, i));
		
		}
	
	} else {
		
		console.log("trace: matrix must be square");
	
	}
	
	return result;

}

/*
 * @param: integer (row)
 * @param: integer (column)
 * @return: matrix object (a minor (n-1)*(n-1) matrix)
 */
MAT.prototype.minor = function(r,c) {
	
	var values = [];
	
	for (var i = 0; i < this.rows; i++) {
		
		for (var j = 0; j < this.cols; j++) {
			
			if (i !== r && j !== c) {
				
				values.push(this.getValue(i, j));
			
			}
		
		}
	
	}
	
	return new MAT(this.rows-1, this.cols-1, values);

}

/*
 * @return: float 
 * The determinant of the matrix using the Laplace Expansion
 */
MAT.prototype.det = function() {
	
	var res = 0, 
		t = 0, 
		u = 0;
	
	if ( ! this.isSquare()) {
		
		res = 0;
		
		console.log("det: matrix must be square");
	
	} else if (this.cols === 1) {
		
		res = this.values[0];
	
	} else if (this.cols === 2) {
		
		res = this.s(this.m(this.values[0], this.values[3]), this.m(this.values[1], this.values[2]));
	
	} else {
		
		for (var j = 0; j < this.cols; j++) {
			
			t = this.m((j%2 === 0 ? 1: -1), this.getValue(0, j));
			
			u = this.minor(0, j).det();
			
			res = this.a(res, this.m(t, u));
		
		}
	
	}
	
	return res;

}

/*
 * @return: matrix object 
 * Naive Gauss Elimination method
 */
MAT.prototype.gaussElimination = function() {
	
	var n = this.cols,
		l = new Array(n),
		R = new MAT(n, n, this.getValues()),
		v = 0;
	
	l[0] = 1;
	
	for (var j = 0; j < n-1; j++) {
		
		for (var i = j+1; i < n; i++) {
			
			l[i] = this.d(R.getValue(i, j), R.getValue(j, j));
		
		}
		
		for (i = j+1; i < n; i++) {
			
			R.setValue(i, j, 0);
			
			for (var k = j+1; k < n; k++) {
				
				v = this.s(R.getValue(i, k), this.m(l[i], R.getValue(j, k)));
				
				R.setValue(i, k, v);
			
			}
		
		}
	
	}
	
	return R;

}

/*
 * @param: Array
 * @return: matrix object
 */
MAT.prototype.solveFor = function(a) {
	
	var m = this.rows,
		n = this.cols,
		l = new Array(n),
		r = new Array(n),
		R = new MAT(n, n, this.getValues());

	if (a.length !== this.rows) {
		
		for (var i = 0; i < m; i++) {
			
			r.push(0);
		
		}
	
	} else if ( ! this.isSquare()) {
		
		for (var i = 0; i < m; i++) {
			
			r.push(0);
		
		}
	
	} else {
		
		/* Forward Elimination */
		for (var j = 0; j < n-1; j++) {
			
			for (var i = j+1; i < n; i++) {
				
				l[i] = this.d(R.getValue(i, j), R.getValue(j, j));
			
			}
			
			for (i = j+1; i < n; i++) {
				
				R.setValue(i, j, 0);

				for (var k = j+1; k < n; k++) {
					
					R.setValue(i, k, this.s(R.getValue(i, k), this.m(l[i], R.getValue(j, k))));
				}

				a[i] = this.s(a[i], this.m(l[i], a[j]));
			
			}
		}
		
		/* Backward solving */
		for (i = n-1; i >= 0; i--) {
			
			r[i] = a[i];
			
			for (j = n-1; j > i; j--) {
				
				r[i] = this.s(r[i], this.m(R.getValue(i, j), r[j]));
			
			}
			
			r[i] = this.d(r[i], R.getValue(i, i));
		
		}
	
	}
	
	return new MAT(m, 1, r);

}

/*
 * @return: matrix object
 */
MAT.prototype.gramSchmidt = function() {
	
	var m = this.rows,
		n = this.cols,
		e = [],
		p, q = [], u, v;
	
	/* Gram-Schmidt */
	for (var i = 0; i < n; i++) {
		
		u = this.getColumn(i);
		
		for (var j = 0; j < i; j++) {
			
			v = this.d(e[j].hermitian().product(this.getColumn(i)).getValue(0,0), e[j].norm());
			
			p = e[j].sProduct(v); // j-th projection
			
			u = u.sub(p);
		
		}
		
		e.push(u.sProduct(this.d(1,u.norm())));
		
		q = q.concat(e[i].toArray());
	
	}
	
	return (new MAT(n, m, q)).transpose();

}

/*
 * QR decomposition
 * @return: Array [Q,R]
 */
MAT.prototype.qr = function() {
	
	var Q, R;
	
	Q = this.gramSchmidt();
	
	R = Q.transpose().product(this);
	
	return [Q, R];
}

/*
 * @return: matrix object
 * Notes:
 * - Acceleration shifts for the QR method are not implemented yet.
 */
MAT.prototype.eigenValues = function() {
	
	var tmp = new MAT(this.rows, this.cols, this.getValues()),
		l = Math.min(this.rows, this.cols),
		QR,
		r = [],
		tr = 0,
		oldtr = 0,
		max = 1000,
		k = 5;
	
	if ( ! this.isSquare()) {
		
		for (var j = 0; j < l; j++) {
			
			r.push(0);
		
		}
	
	} else {
		
		for (var i = 0; i < max && k > 0; i++) {
			
			QR = tmp.qr();
			
			tmp = QR[1].product(QR[0]);
			
			/* 
			 * If the trace has not changed for the last 
			 * k times, we may consider stability has 
			 * been reached.
			 */
			
			tr = tmp.trace();
			
			if (tr === oldtr){
				
				k--;
			
			}
			
			oldtr = tr;
		
		}
		
		for (var j = 0; j < l; j++) {
			
			r.push(tmp.getValue(j, j));
		
		}
	
	}
	
	return new MAT(l, 1, r);

}

/*
 * @return: matrix object
 */
MAT.prototype.eigenVectors = function() {
	
	var tmp = new MAT(this.rows, this.cols, this.getValues()),
		l = Math.min(this.rows, this.cols),
		QR,
		tr = 0,
		oldtr = 0,
		max = 1000,
		k = 5;
	
	for (var i = 0; i < max && k > 0; i++) {
		
		QR = tmp.qr();
		
		tmp = QR[1].product(QR[0]);
		
		tr = tmp.trace ();
		
		if (tr === oldtr) k--;
		
		oldtr = tr;
	
	}
	
	return QR[0];
}

/*
 * @param: integer (size of the resulting matrix n*n)
 * @return: matrix object
 */
MAT.prototype.identity = function(a) {
	
	var values = [];
	
	if (typeof a !== undefined && a > 0) {
		
		for (var i = 0; i < a; i++) {
			
			for (var j = 0; j < a; j++) {
				
				values.push(i === j ? 1 : 0);
			
			}
		
		}
	
	}
	
	return new MAT(a, a, values);

}

/*
 * @param: integer 
 * @param: float, Array
 * @return: matrix object
 */
MAT.prototype.diag = function(a,b) {
	
	var values = [];
	
	for (var i = 0; i < a; i++) {
		
		for (var j = 0; j < a; j++) {
			
			values.push(i === j ? b : 0);
		
		}
	
	}
	
	return new MAT(a, a, values);

}

/*
 * @return: float
 */
MAT.prototype.pNorm = function(a) {
	
	var res = 0, 
		tmp = 1;
	
	for (var i = 0; i < this.rows; i++) {
	
		for (var j = 0; j < this.cols; j++) {
			
			tmp = 1;
			
			for (var k = 0; k < a; k++) {
				
				tmp = this.m(tmp, this.mod(this.values[this.cols*i+j]));
			
			}
			
			res = this.a(res, tmp);
		
		}
	
	}
	
	res = Math.pow(Math.E,this.d(Math.log(res), a));
	
	return res;

}

/*
 * @return: float
 * Euclidean norm (p = 2)
 */
MAT.prototype.norm = function() {
	
	return this.pNorm(2);

}

/*
 * @param: integer
 * @return: matrix object
 */
MAT.prototype.toeplitz = function(a) {
	
	var res = [], 
		row = [],
		l = 0,
		m = this.values.length;
		
	for (var i = 0; i < a; i++) {
		
		row.push(0);
	
	}
	
	l = m+a-1;
	
	/* column vector */
	for (var i = 0; i < l; i++) {
		
		if (i < m) {
			
			if (this.cols === 1 && this.rows > 1) {
				
				/* column vector */
				row.unshift(this.c(this.values[i]));
			
			} else if (this.cols > 1 && this.rows === 1) {
				
				row.unshift(this.values[i]);
			
			} else {
				/* do some stuff here */
			}
		
		} else {
			
			row.unshift(0);
		
		}
		
		row.pop();
		
		res = res.concat(row);
	
	}
	
	return new MAT(l, a, res);

}