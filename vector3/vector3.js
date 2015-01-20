/**
 * 前端与数学：三维空间中的向量
 */

/** 
 * 构造函数,x和y和z参数就是向量的三个点
 */
function Vector3 ( x, y, z ) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};

Vector3.prototype = {
	/** 
	 * 引用构造函数
	 * @method	constructor
	 * @param	Vector3 param
	 */
	constructor : Vector3,
	/** 
	 * 有时候需要检查对象的属性xyz
	 * @method	toArray
	 * @return	{array}
	 */
	toArray : function () {
		return [ this.x, this.y, this.z ];
	},
	/** 
	 * xyz是创建对象时候赋值的，之后可能会修改xyz，所以需要初始化该对象
	 * @method	reset
	 * @param	x, y, z
	 */
	reset : function ( x, y ) {
		this.constructor( x, y, z );
	},
	/** 
	 * 在有了多个对象后，有时需要在对象之间进行比较
	 * 如何判断两个向量对象是否相等，操作符等号是无效的
	 * 两向量相等就是，两个x和两个y和两个z是否相等
	 * @method	equals
	 * @param	向量对象
	 * @return	{boolean}
	 */
	equals : function ( v ) {
		return (( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ));
	},
	/** 
	 * 复制一个对象，返回一个包含有当前xyz的新的对象
	 * @method	clone
	 * @return	新的向量对象
	 */
	clone : function () {
		return new this.constructor( this.x, this.y, this.z );
	},
	/** 
	 * 执行加法运算，与当前的向量相加
	 * @method	plus
	 * @param	需要加的向量对象
	 */
	plus : function ( v ) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	},
	/** 
	 * 执行加法运算，与当前的向量相加，并返回新的对象
	 * @method	plusNew
	 * @param	需要加的向量对象
	 */
	plusNew : function ( v ) {
		return new this.constructor( this.x + v.x, this.y + v.y, this.z + v.z );
	},
	/** 
	 * 执行减法运算，用当前对象减去该对象
	 * @method	minus
	 * @param	需要减的向量对象
	 */
	minus : function ( v ) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	},
	/** 
	 * 执行减法运算，用当前对象减去该对象，并返回新的对象
	 * @method	minusNew
	 * @param	需要减的向量对象
	 */
	minusNew : function ( v ) {
		return new this.constructor( this.x - v.x, this.y - v.y, this.z - v.z );
	},
	/** 
	 * 反转一个向量，对它求逆，需要分别乘以-1，其实就是旋转180度
	 * @method	negate
	 */
	negate: function () {
		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
	},
	/** 
	 * 反转一个向量，对它求逆，并返回新的对象
	 * @method	negateNew
	 */
	negateNew: function () {
		return new this.constructor( -this.x, -this.y, -this.z );
	},
	/** 
	 * 将向量按指定的系数进行相乘，可以理解成缩放
	 * @method	multiplyScalar
	 * @param	系数，标量scalar
	 */
	multiplyScalar: function ( scalar ) {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
	},
	multiplyScalarNew: function ( scalar ) {
		return new this.constructor( this.x * scalar, this.y * scalar, this.z * scalar );
	},
	/** 
	 * 向量的长度，代表了向量的大小，或向量的"绝对值"或"模"，利用了勾股定理得出
	 * @method	length
	 * @param	
	 */
	length: function () {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
	},
	/** 
	 * 给定新的长度，修改向量的大小，计算目标长度和当前长度的比值，然后以此比例进行缩放
	 * @method	setLength
	 * @param	目标长度
	 */
	setLength: function ( l ) {
		var oldLength = this.length();
		if ( oldLength !== 0 && l !== oldLength ) {
			this.multiplyScalar( l / oldLength );
		}
	},
	/** 
	 * 两个向量根据某种规则相乘，得到一个数字，称为“点积”或“数量积”，三个分量乘积相加
	 * @method	dot
	 * @param	目标向量
	 */
	dot: function ( v ) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	/** 
	 * 两个向量的夹角，这个直接有方程，但是我没研究明白是怎么证明出来的
	 * 搜到这个，也没看懂http://blog.csdn.net/sevencolorfish/article/details/6845871
	 * @method	degreeBetween
	 * @param	目标向量
	 */
	degreeBetween: function ( v ) {
		var theta = this.dot( v ) / ( this.length() * v.length() );
		return Math.acos( theta );
	},
	/** 
	 * 角度转弧度
	 * @method	degToRad
	 * @param	角度
	 */
	degToRad: function ( deg ) {
		return deg * (Math.PI / 180);
	},
	/** 
	 * 弧度转角度
	 * @method	radToDeg
	 * @param	弧度
	 */
	radToDeg: function ( rad ) {
		return rad * (180 / Math.PI);
	},
	/** 
	 * 计算当前向量和一个三维向量的叉积，又称向量积，结果是一个向量
	 * 也是依据现成的公式
	 * @method	cross
	 * @param	目标向量
	 */
	cross: function ( v ) {
		var x = this.x, 
			y = this.y, 
			z = this.z;
		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;
		return this;
	},
	/** 
	 * 计算指定的两个三维向量的叉积，又称向量积，结果是一个向量
	 * 也是依据现成的公式
	 * @method	crossVectors
	 * @param	要计算的2个向量
	 */
	crossVectors: function ( a, b ) {
		var ax = a.x, 
			ay = a.y, 
			az = a.z;
		var bx = b.x, 
			by = b.y, 
			bz = b.z;
		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;
		return this;
	},
	/** 
	 * 计算缩放一个物体需要的透视比例
	 * @method	getPerspective
	 * @param	投影的观察距离
	 */
	getPerspective: function (viewDist) {
		if(!viewDist){
			viewDist = 300;
		}
		return viewDist / (this.z + viewDist);

	},
	/** 
	 * 投射到屏幕上的二维点
	 * @method	persProject
	 * @param	投射比例
	 */
	persProject: function (p) {
		if(!p){
			p = this.getPerspective();
		}
		this.x *= p;
		this.y *= p;
		this.z = 0;
	},
	persProjectNew: function (p) {
		if(!p){
			p = this.getPerspective();
		}
		return new this.constructor( p * this.x, p * this.y, 0 );
	},
	/** 
	 * 绕XY轴旋转，参考旋转公式http://zhidao.baidu.com/question/562549647.html?fr=qrl&index=1&qbl=topic_question_1
	 * @method	rotateXY
	 * @param	绕XY的角度
	 */
	rotateXY: function (a, b) {
        var ca = Math.cos( this.degToRad(a) ), 
        	sa = Math.sin( this.degToRad(a) ),
        	cb = Math.cos( this.degToRad(b) ), 
        	sb = Math.sin( this.degToRad(b) );

		var x = this.x, 
			y = this.y, 
			z = this.z,
       		rz = y * sa + z * ca;

        this.y = y * ca - z * sa;
        this.z = x * -sb + rz * cb;
        this.x = x * cb + rz * sb;
	}




};
