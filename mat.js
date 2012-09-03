/*
 * @author dhuertas
 * @email huertas.dani@gmail.com
 */
var MAT = (function() {

	/*
	 * Arithmetical operations
	 */
	var OP = {

		sum : function(a, b) {

			if (a instanceof Array && b instanceof Array) {

				return [a[0] + b[0], a[1] + b[1]];

			} else if (a instanceof Array && ! b instanceof Array) {

				return [a[0] + b, a[1]];

			} else if ( ! a instanceof Array && b instanceof Array) {

				return [a + b[0], b[1]];

			} else {

				return a + b;

			}

		}, 

		subtract : function(a, b) {

			if (a instanceof Array && b instanceof Array) {

				return [a[0] - b[0], a[1] - b[1]];

			} else if (a instanceof Array && ! b instanceof Array) {

				return [a[0] - b, a[1]];

			} else if ( ! a instanceof Array && b instanceof Array) {

				return [a - b[0], b[1]];

			} else {

				return a - b;

			}

		},

		product : function(a, b) {

			if (a instanceof Array && b instanceof Array) {

				return [a[0]*b[0] - a[1]*b[1], a[0]*b[1] + a[1]*b[0]];

			} else if (a instanceof Array && ! b instanceof Array) {

				return [a[0]*b, a[1]*b];

			} else if ( ! a instanceof Array && b instanceof Array) {

				return [a*b[0], a*b[1]];

			} else {

				return a*b;

			}

		},

		division : function(a, b) {

			if (a instanceof Array && b instanceof Array) {

				if (b[0] === 0 && b[1] === 0) {

					throw ("division by 0");

				}

				return [
					( a[0]*b[0] + a[1]*b[1] ) / ( b[0]*b[0] + b[1]*b[1] ),
					( a[1]*b[0] - a[0]*b[1] ) / ( b[0]*b[0] + b[1]*b[1] )];

			} else if (a instanceof Array && ! b instanceof Array) {

				if (b === 0) {

					throw ("division by 0");

				}

				return [a[0]/b, a[1]/b];

			} else if ( ! a instanceof Array && b instanceof Array) {

				if (b[0] === 0 && b[1] === 0) {

					throw ("division by 0");

				}

				return [
					 a*b[0] / ( b[0]*b[0] + b[1]*b[1] ),
					-a*b[1] / ( b[0]*b[0] + b[1]*b[1] )];

			} else {

				if (b === 0) {

					throw ("division by 0");

				}

				return a/b;

			}

		},

		conjugate : function(a) {

			if (a instanceof Array) {

				return [a[0], -a[1]];

			}

			return a;

		},

		modulus : function(a) {

			if (a instanceof Array) {

				return Math.sqrt(a[0]*a[0] + a[1]*a[1]);

			}

			return Math.abs(a);

		}

	};

	var ATTRIBUTES = ['rows', 'columns', 'values', 'error', 'maxrounds', 'overwrite'],
		DEFAULTS = {maxrounds : 1000, error : 0.000001, overwrite : false};
	
	/*
	 * helper functions 
	 */
	function inArray(needle, haystack) {

		for (var i = 0; i < haystack.length; i++) {

			if (needle == haystack[i]) return true;

		}

		return false;

	}

	/*
	 * MAT object constructor
	 * @param {integer} r (rows)
	 * @param {integer} c (columns)
	 * @param {array} v (values)
	 */
	function construct(r, c, v) {

		for (var elem in DEFAULTS) {

			this[elem] = DEFAULTS[elem];

		}
		
		if (arguments[0] instanceof Object) {

			for (var elem in arguments[0]) {

				if (inArray(elem, ATTRIBUTES)) {

					this[elem] = arguments[0][elem];

				}

			}

		} else {

			this.rows = r;

			this.columns = c;

			this.values = v;

		}

	}

	construct.prototype = {
	
		/*
		 * fromArray
		 * @param {array} a (e.g. [[0,1,2],[3,4,5],[6,7,8]])
		 * @return {object} matrix
		 */
		fromArray : function(a) {

			var values = [];

			if ( ! a instanceof Array) {

				throw ("fromArray: argument must be an array");

			} else {

				this.setRows(a.length);

				this.setColumns(a[0].length);

				this.values = Array(this.rows*this.columns);

				for (var i = 0; i < this.rows; i++) {

					for (var j = 0, len = a[i].length; j < len; j++) {

						this.setValue(i, j, a[i][j]);

					}

				}

			}

			return this;

		},
	
		/*
		 * toArray
		 * @return {array}
		 */
		toArray : function () {

			return this.values.slice(0);

		},

		/*
		 * toString
		 * @return {string}
		 */
		toString : function() {

			return this.values.toString();

		},

		/*
		 * getColumn
		 * @param {integer} j (e.g. j-th column)
		 * @return {object} matrix (column vector)
		 */
		getColumn : function(j) {

			var res = [];

			if (this.columns > j && j >= 0) {

				for (var i = 0; i < this.rows; i++) {

					res.push(this.values[this.columns*i+j]);

				}

			} else {

				for (var i = 0; i < this.rows; i++) {

					res.push(0);

				}

			}

			return (new MAT(this.rows, 1, res));

		},

		/*
		 * getColumns
		 * @return {integer} (the number of columns)
		 */
		getColumns : function() {

			return this.columns;

		},

		/*
		 * getLength
		 * @return {integer} (the number of elements)
		 */
		getLength : function() {

			return this.values.length;

		},

		/*
		 * getRow
		 * @param {integer} i (the i-th column)
		 * @return {object} (row vector)
		 */
		getRow : function(i) {

			var res = [];

			if (this.rows > i && i >= 0) {

				for (var j = 0; j < this.columns; j++) {

					res.push(this.values[this.columns*i+j]);

				}

			} else {

				for (var j = 0; j < this.columns; j++) {

					res.push(0);

				}

			}

			return (new MAT(1, this.columns, res));

		},

		/*
		 * getRows
		 * @return {integer} (the number of rows)
		 */
		getRows : function() {

			return this.rows;

		},

		/*
		 * getShape
		 * @return {array}
		 */
		getShape : function() {

			return [this.rows, this.columns];

		},

		/*
		 * getValue
		 * @param {integer} a (i-th row)
		 * @param {integer} b (j-th column)
		 * @return {float|array}
		 */
		getValue : function(i, j) {

			return this.values[i*this.columns + j];

		},

		/*
		 * getValues
		 * @return {array} (a copy of|the matrix values)
		 */
		getValues : function() {

			return this.values.slice(0);

		},

		/*
		 * setRows
		 * @param {integer} a
		 * @return {object}
		 */
		setRows : function(a) {

			this.rows = a;

			return this;

		},

		/*
		 * setColumns
		 * @param {integer} a
		 * @return {object} 
		 */
		setColumns : function(a) {

			this.columns = a;

			return this;

		},

		/*
		 * setValue
		 * @param {integer} a
		 * @param {integer} b
		 * @param {float|array} c
		 * @return {object}
		 */
		setValue : function(a, b, c) {

			this.values[a*this.columns + b] = c;

			return this;

		},

		/*
		 * isSquare
		 * @return {boolean}
		 */
		isSquare : function() {

			return (this.columns === this.rows);

		},

		/*
		 * isColumnVector
		 * @return {boolean}
		 */
		isColumnVector : function() {

			return (this.columns === 1 && this.rows > 1);

		},

		/*
		 * isRowVector
		 * @return {boolean}
		 */
		isRowVector : function() {
	
			return (this.columns > 1 && this.rows === 1);

		},

		/*
		 * isVector
		 * @return {boolean}
		 */
		isVector : function() {

			return (this.isColumnVector() || this.isRowVector());

		},

		/*
		 * isSameSize
		 * @param {object} a {matrix}
		 * @return boolean
		 */
		isSameSize : function(a) {

			return (a.getColumns() === this.columns && a.getRows() === this.rows);

		},

		/*
		 * add
		 * @param {object} matrix
		 * @return {object} matrix (X+A)
		 */
		add : function(a) {

			if (this.isSameSize(a)) {

				if (this.overwrite) {

					for (var i = 0; i < this.rows; i++) {

						for (var j = 0; j < this.columns; j++) {

							this.setValue(i, j, OP.sum(this.getValue(i, j), a.getValue(i, j)));

						}

					}

				} else {

					var values = [];

					for (var i = 0; i < this.rows; i++) {

						for (var j = 0; j < this.columns; j++) {

							values.push(OP.sum(this.getValue(i, j), a.getValue(i, j)));

						}

					}

				}

			} else {

				throw ("add: matrices must be same size");

			}

			return this.overwrite ? this : new MAT(this.rows, this.columns, values);

		},

		/*
		 * subtract
		 * @param {object} matrix
		 * @return {object} matrix (X-A)
		 */
		subtract : function(a) {

			if (this.isSameSize(a)) {

				if (this.overwrite) {

					for (var i = 0; i < this.rows; i++) {

						for (var j = 0; j < this.columns; j++) {

							this.setValue(i, j, 
								OP.subtract(this.getValue(i, j), a.getValue(i, j)));

						}

					}

				} else {

					var values = [];

					for (var i = 0; i < this.rows; i++) {

						for (var j = 0; j < this.columns; j++) {

							values.push(OP.subtract(this.getValue(i, j), a.getValue(i, j)));

						}

					}

				}

			} else {

				throw ("sub: matrices must be same size");

			}

			return this.overwrite ? this : new MAT(this.rows, this.columns, values);

		},

		/*
		 * product
		 * @param {object} matrix
		 * @return {object} matrix (X*A)
		 */
		product : function(a) {

			var temp = 0,
				cols = a.getColumns(),
				values = [];

			if (a.getRows() === this.columns) {

				for (var i = 0; i < this.rows; i++) {

					for (var j = 0; j < cols; j++) {

						temp = 0;

						for (var k = 0; k < this.columns; k++) {

							temp = OP.sum(temp, OP.product(
									this.values[this.columns*i + k], 
									a.getValue(k, j)));

						}

						values.push(temp);

					}

				}

				if (this.overwrite) {

					this.values.splice(0, this.values.length);

					this.values.concat(values);

				}

			} else {

				throw ("product: matrix size does not match");

			}

			return this.overwrite ? this : new MAT(this.rows, a.getColumns(), values);

		},

		/*
		 * hadamardProduct
		 * @param {object} matrix
		 * @return {object} matrix
		 */
		hadamardProduct : function(a) {

			if (this.isSameSize(a)) {

				if (this.overwrite) {

					for (var i = 0; i < this.rows; i++) {

						for (var j = 0; j < this.columns; j++) {

							this.setValue(i, j, OP.product(this.getValue(i, j), a.getValue(i, j)));

						}
					}

				} else {

					var values = [];

					for (var i = 0; i < this.rows; i++) {

						for (var j = 0; j < this.columns; j++) {

							values.push(OP.product(this.getValue(i, j), a.getValue(i, j)));

						}

					}

				}

			} else {

				throw ("hadamardProduct: matrices must be the same size");

			}

			return this.overwrite ? this : new MAT(this.rows, this.columns, values);

		},

		/*
		 * scalarProduct
		 * @param {float}
		 * @return {object} matrix (a*X)
		 */
		scalarProduct : function(a) {

			if (this.overwrite) {

				for (var i = 0; i < this.rows; i++) {

					for (var j = 0; j < this.columns; j++) {

						this.setValue(i, j, OP.product(this.getValue(i, j), a));

					}

				}

			} else {

				var values = [];

				for (var i = 0; i < this.rows; i++) {

					for (var j = 0; j < this.columns; j++) {

						values.push(OP.product(this.getValue(i, j), a));

					}

				}

			}

			return this.overwrite ? this : new MAT(this.rows, this.columns, values);

		},

		/*
		 * transpose
		 * @return {object} matrix
		 */
		transpose : function() {

			var values = [];

			for (var i = 0; i < this.columns; i++) {

				for (var j = 0; j < this.rows; j++) {

					values.push(this.values[this.columns*j + i]);

				}

			}

			if (this.overwrite) {

				var temp = this.rows;

				this.rows = this.columns;

				this.columns = temp;

				this.values.splice(0, this.values.length);

				this.values.concat(values);

			}

			return this.overwrite ? this : new MAT(this.columns, this.rows, values);

		},

		/*
		 * hermitian
		 * @return {object} matrix
		 */
		hermitian : function() {

			var values = [];

			for (var i = 0; i < this.columns; i++) {

				for (var j = 0; j < this.rows; j++) {

					values.push(OP.conjugate(this.values[this.columns*j + i]));

				}

			}

			if (this.overwrite) {

				this.values.splice(0, this.values.length);

				this.values.concat(values);

			}

			return this.overwrite ? this : new MAT(this.columns, this.rows, values);

		},

		/*
		 * trace
		 * @return {float}
		 */
		trace : function() {

			var result = 0;

			if (this.isSquare()) {

				for (var i = 0; i < this.columns; i++) {

					result = OP.sum(result, this.getValue(i, i));

				}

			} else {

				throw ("trace: matrix must be square");

			}

			return result;

		},

		/*
		 * upperTrace
		 * @param {integer} a (a-th upper diagonal)
		 * @return {float|array} result
		 */
		upperTrace : function(a) {

			var result = 0;

			if ( ! this.isSquare()) {

				throw ("upperTrace: matrix must be square");

			} else if (a > this.columns - 1) {

				throw ("upperTrace: diagonal out of range");

			} else {

				for (var i = 0; i < this.columns - a; i++) {

					result = OP.sum(result, this.getValue(i, i + a));

				}

			}

			return result;

		},

		/*
		 * lowerTrace
		 * @param {integer} a (a-th lower trace)
		 * @return {float|array} result
		 */
		lowerTrace : function(a) {

			var result = 0;

			if ( ! this.isSquare()) {

				throw ("lowerTrace: matrix must be square");

			} else if (a > this.columns - 1) {

				throw ("lowerTrace: diagonal out of range");

			} else {

				for (var i = 0; i < this.columns - a; i++) {

					result = OP.sum(result, this.getValue(i + a, i));

				}

			}

			return result;

		},

		/*
		 * minor
		 * @param {integer} row
		 * @param {integer} column
		 * @return {object} matrix (a minor (n-1)*(n-1) matrix)
		 */
		minor : function(r, c) {

			var values = [];

			for (var i = 0; i < this.rows; i++) {

				for (var j = 0; j < this.columns; j++) {

					if (i !== r && j !== c) {

						values.push(this.getValue(i, j));

					}

				}

			}

			if (this.overwrite) {

				this.values.splice(0, this.values.length);

				this.values.concat(values);

			}

			return this.overwrite ? this : new MAT(this.rows-1, this.columns-1, values);

		},

		/*
		 * determinant
		 * Obtains the determinant using the Laplace formula by default
		 * @param {string} method ('lu', 'qr')
		 * @return {float|array}
		 */
		determinant : function(method) {

			var res = 0, 
				t = 0, 
				u = 0,
				ow = this.overwrite,
				method = typeof method === "string" ? method : 'laplace';


			if ( ! this.isSquare()) {

				throw ("determinant: matrix must be square");

			} else if (this.columns === 1) {

				res = this.values[0];

			} else if (this.columns === 2) {

				res = OP.subtract(
					OP.product(this.values[0], this.values[3]), 
					OP.product(this.values[1], this.values[2]));

			} else if (method.toLowerCase() == 'lu') {
				/* LU decomposition method */
				var lu = this.luDecomposition();

				res = 1;

				for (var i = 0, len = lu[0].getColumns(); i < len; i++) {

					t = OP.product(lu[0].getValue(i, i), lu[1].getValue(i, i));

					res = OP.product(res, t);

				}

			} else if (method.toLowerCase() == 'qr') {
				/* QR decomposition method */
				var qr = this.qrDecomposition();

				res = 1;

				for (var i = 0, len = qr[1].getColumns(); i < len; i++) {

					res = OP.product(res, qr[1].getValue(i, i));

				}

			} else {
				/* Laplace's formula */
				this.overwrite = false;

				for (var j = 0; j < this.columns; j++) {

					t = OP.product((j%2 === 0 ? 1: -1), this.getValue(0, j));

					u = this.minor(0, j).determinant();

					res = OP.sum(res, OP.product(t, u));

				}

				this.overwrite = ow;

			}

			return res;

		},

		/*
		 * Alias for determinant
		 * @return {float|array}
		 */
		det : function(method) { return this.determinant(method); },

		/*
		 * gaussElimination
		 * Naive Gauss Elimination method
		 * @return {object} matrix 
		 */
		gaussElimination : function() {

			var n = this.columns,
				l = new Array(n),
				R = new MAT(this.rows, this.columns, this.getValues()),
				v = 0;

			l[0] = 1;

			for (var j = 0; j < this.columns-1; j++) {

				for (var i = j+1; i < this.rows; i++) {

					l[i] = OP.division(R.getValue(i, j), R.getValue(j, j));

				}

				for (i = j+1; i < this.rows; i++) {

					R.setValue(i, j, 0);

					for (var k = j + 1; k < this.columns; k++) {

						v = OP.subtract(R.getValue(i, k), OP.product(l[i], R.getValue(j, k)));

						R.setValue(i, k, v);

					}

				}

			}

			if (this.overwrite) {

				this.values.splice(0, this.values.length);

				this.values.concat(values);

			}

			return this.overwrite ? this : R;

		},

		/*
		 * solve
		 * @param {array} a (constants)
		 * @return {object} matrix
		 */
		solve : function(a) {

			var m = this.rows,
				n = this.columns,
				l = new Array(n),
				r = new Array(n),
				R = new MAT(n, n, this.getValues());

			if (a.length !== this.rows) {
				
				throw ("solve: the argument length and the number of rows must match");
					
			} else if ( ! this.isSquare()) {

				throw ("solve: matrix must be square");

			} else {

				/* Forward Elimination */
				for (var j = 0; j < this.columns-1; j++) {

					for (var i = j+1; i < this.rows; i++) {

						l[i] = OP.division(R.getValue(i, j), R.getValue(j, j));

					}

					for (i = j+1; i < this.rows; i++) {

						R.setValue(i, j, 0);

						for (var k = j+1; k < this.columns; k++) {

							R.setValue(i, k, OP.subtract(
								R.getValue(i, k), 
								OP.product(l[i], R.getValue(j, k))));

						}

						a[i] = OP.subtract(a[i], OP.product(l[i], a[j]));

					}

				}

				/* Backward solving */
				for (i = n-1; i >= 0; i--) {

					r[i] = a[i];

					for (j = n-1; j > i; j--) {

						r[i] = OP.subtract(r[i], OP.product(R.getValue(i, j), r[j]));

					}

					r[i] = OP.division(r[i], R.getValue(i, i));

				}

			}

			return new MAT(m, 1, r);

		},

		/*
		 * gramSchmidt
		 * The Gram-Schmidt process
		 * @return {object} matrix
		 */
		gramSchmidt : function() {

			var m = this.rows,
				n = this.columns,
				e = [],
				p, q = [], u, v;

			/* Gram-Schmidt */
			for (var i = 0; i < n; i++) {

				u = this.getColumn(i);

				for (var j = 0; j < i; j++) {

					v = OP.division(
						e[j].hermitian().product(this.getColumn(i)).getValue(0,0), 
						e[j].norm());

					p = e[j].scalarProduct(v); // j-th projection

					u = u.subtract(p);

				}

				e.push(u.scalarProduct(OP.division(1, u.norm())));

				q = q.concat(e[i].toArray());

			}

			if (this.overwrite) {

				this.rows = n;

				this.columns = m;

				this.values.splice(0, this.values.length);

				this.values.concat(q);

			}

			return (this.overwrite ? this : new MAT(n, m, q)).transpose();

		},

		/*
		 * qrDecomposition
		 * QR decomposition
		 * @return {array} [Q,R]
		 */
		qrDecomposition : function() {

			var Q,
				R,
				ow = this.overwrite;

			this.overwrite = false;

			Q = this.gramSchmidt();

			R = Q.transpose().product(this);

			this.overwrite = ow;

			return [Q, R];

		}, 

		/*
		 * Alias for the qrDecomposition function
		 */
		qr : function() {

			 return this.qrDecomposition();

		},

		/*
		 * luDecomposition
		 * LU decomposition
		 * @return {array} [L,U]
		 */
		luDecomposition : function() {

			var l = [],
				L = this.identity(this.columns), 
				U = new MAT(this.rows, this.columns, this.getValues());

			for (var j = 0; j < this.columns - 1; j++) {

				for (var i = j+1; i < this.columns; i++) {

					l[i] = OP.division(U.getValue(i, j), U.getValue(j, j));

					L.setValue(i, j, l[i]);

				}

				for (i = j+1; i < this.columns; i++) {

					U.setValue(i, j, 0);

					for (var k = j+1; k < this.columns; k++) {

						U.setValue(i, k, OP.subtract(
							U.getValue(i, k), 
							OP.product(l[i], U.getValue(j, k))));

					}

				}

			}

			return [L, U];

		},

		/*
		 * Alias for the luDecomposition
		 */
		lu : function() {
		
			return this.luDecomposition();

		},

		/* 
		 * eigenValues
		 * Eigenvalues using the QR iteration process
		 * @return {object} matrix
		 */
		eigenValues : function() {

			var tmp = new MAT({
					rows: this.rows, 
					columns: this.columns, 
					values: this.getValues(),
					overwrite: true
				}),
				QR,
				values = [];

			if ( ! this.isSquare()) {

				throw ("eigenValues: matrix must be square");

			} else {

				for (var i = 0; i < this.maxrounds; i++) {

					QR = tmp.qrDecomposition();

					tmp = QR[1].product(QR[0]);

					console.log(tmp.toString());
					/* 
					 * Stop the process when the values
					 * below the main diagonal are sufficiently small 
					 */
					if (OP.modulus(tmp.lowerTrace(1)) < this.error) {

						break;			

					}

				}

				for (var j = 0; j < this.rows; j++) {

					values.push(tmp.getValue(j, j));

				}

			}

			return i == this.maxrounds ? null : new MAT(values.length, 1, values);

		},

		/*
		 * eigenVectors
		 * @return {object} matrix
		 */
		eigenVectors : function() {

			var tmp = new MAT({
					rows: this.rows, 
					columns: this.columns, 
					values: this.getValues(),
					overwrite: true
				}),
				QR;

			for (var i = 0; i < this.maxrounds; i++) {

				QR = tmp.qrDecomposition();

				tmp = QR[1].product(QR[0]);

				/* 
				 * Stop the process when the values
				 * below the main diagonal are sufficiently small 
				 */
				if (OP.modulus(tmp.lowerTrace(1)) < this.error) {

					break;			

				}

			}

			QR = tmp.qrDecomposition();

			return QR[0];

		},

		/*
		 * identity
		 * @param {integer} size of the resulting matrix n*n
		 * @return {object} matrix
		 */
		identity : function(a) {

			var values = [];

			if (typeof a !== undefined && a > 0) {

				for (var i = 0; i < a; i++) {

					for (var j = 0; j < a; j++) {

						values.push(i === j ? 1 : 0);

					}

				}

			}

			return new MAT(a, a, values);

		},

		/*
		 * diagonal
		 * @param {integer} a size
		 * @param {float|array} b (e.g. complex value [real,imag])
		 * @return {object} matrix
		 */
		diagonal : function(a, b) {

			var values = [],
				res;

			if (typeof a === "undefined" || a <= 0) {

				throw ("diagonal: first argument must be an integer greater than 0");

			} else {

				for (var i = 0; i < a; i++) {

					for (var j = 0; j < a; j++) {

						values.push(i === j ? b : 0);

					}

				}

				res = new MAT(a, a, values);

			}

			return res;

		},

		/*
		 * pNorm
		 * @param {integer} a
		 * @return {float}
		 */
		pNorm : function(a) {

			var res = 0, 
				tmp = 1;

			for (var i = 0; i < this.rows; i++) {

				for (var j = 0; j < this.columns; j++) {

					tmp = 1;

					for (var k = 0; k < a; k++) {

						tmp = OP.product(tmp, OP.modulus(this.values[this.columns*i + j]));

					}

					res = OP.sum(res, tmp);

				}

			}

			res = Math.pow(Math.E, OP.division(Math.log(res), a));

			return res;

		},

		/*
		 * norm
		 * Euclidean norm (p = 2)
		 * @return {float}
		 */
		norm : function() {

			return this.pNorm(2);

		},

		/*
		 * toToeplitz
		 * @param {integer} a
		 * @return {object} matrix
		 */
		toToeplitz : function(a) {

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

					if (this.isColumnVector()) {

						/* column vector */
						row.unshift(OP.conjugate(this.values[i]));

					} else if (this.isRowVector()) {

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

		},

		/*
		 * inverse
		 * Matrix inverse
		 * @return {object} matrix
		 */
		inverse : function() {

			var values = [],
				det = this.determinant(),
				sign = 1;

			if (det === 0) {

				throw ("inverse: unable to invert matrix, determinant is 0");

			} else if ( ! this.isSquare()) {

				throw ("inverse: matrix must be square");

			} else {

				for (var i = 0; i < this.rows; i++) {

					for (var j = 0; j < this.columns; j++) {

						sign = (i+j)% 2 === 0 ? 1 : -1;

						values.push(OP.product(sign, 
							OP.division(this.minor(i, j).det(), det)));

					}

				}

			}

			if (this.overwrite) {

				this.values.splice(0, this.values.length);

				this.values.concat(values);

			}

			return (this.overwrite ? this : new MAT(this.rows, this.columns, values)).hermitian();

		},

		/*
		 * pseudoInverse
		 * The Moore-Penrose Pseudoinverse
		 * @return {object} matrix
		 */
		pseudoInverse : function() {

			var M = this.hermitian().product(this);

			if (M.det() === 0) {

				/* right inverse */
				M = this.product(this.hermitian());

				if (M.det() === 0) {

					throw ("pseudoInverse: unable to invert matrix");

				} else {

					M = this.hermitian().product(M.inverse());

				}

			} else {

				/* left inverse */
				M = M.inverse().product(this.hermitian());

			}

			return M;

		},

		/*
		 * toVandermonde
		 * @param {integer} n (number of columns)
		 * @return {object} matrix
		 */
		toVandermonde : function(n) {

			var values = [],
				k = 0,
				a = this.getValues(),
				len = a.length;

			for (var i = 0; i < len; i++) {

				for (var j = 0; j < n; j++) {

					if (j === 0) {

						values.push(1);

					} else if (j === 1) {

						values.push(a[i]);

					} else {

						values.push(OP.product(a[i], values[k-1]));

					}

					k++;

				}

			}

			if (this.overwrite) {

				this.rows = len;

				this.columns = n;

				this.values.splice(0, this.values.length);

				this.values.concat(values);

			}

			return this.overwrite ? this : new MAT(len, n, values);

		},

		/*
		 * zero
		 * @return {object} a matrix filled with zeros 
		 */
		zero : function() {

			var values = [];

			for (var i = 0, len = this.columns*this.rows; i < len; i++) {

				values.push(0);

			}

			return new MAT(this.rows, this.columns, values);

		},
	}

	return construct;

})();
