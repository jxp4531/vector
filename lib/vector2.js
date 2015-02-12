/**
 * 前端与数学：二维空间中的向量
 */

/** 
 * 构造函数,x和y参数就是向量的两个点
 */
function Vector2 ( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
};

Vector2.prototype = {
	/** 
	 * 引用构造函数
	 * @method	constructor
	 * @param	Vector2 param
	 */
	constructor : Vector2,
	/** 
	 * 有时候需要检查对象的两个属性xy
	 * @method	toArray
	 * @return	{array}
	 */
	toArray : function () {
		return [ this.x, this.y ];
	},
	/** 
	 * xy是创建对象时候赋值的，之后可能会修改xy，所以需要初始化该对象
	 * @method	reset
	 * @param	x, y
	 */
	reset : function ( x, y ) {
		this.constructor( x, y );
	},
	/** 
	 * 在有了多个对象后，有时需要在对象之间进行比较
	 * 如何判断两个向量对象是否相等，操作符等号是无效的
	 * 两向量相等就是，两个x和两个y是否相等
	 * @method	equals
	 * @param	向量对象
	 * @return	{boolean}
	 */
	equals : function ( v ) {
		return (( v.x === this.x ) && ( v.y === this.y ));
	},
	/** 
	 * 复制一个对象，返回一个包含有当前xy的新的对象
	 * @method	clone
	 * @return	新的向量对象
	 */
	clone : function () {
		return new this.constructor( this.x, this.y );
	},
	/** 
	 * 执行加法运算，与当前的向量相加
	 * @method	plus
	 * @param	需要加的向量对象
	 */
	plus : function ( v ) {
		this.x += v.x;
		this.y += v.y;
	},
	/** 
	 * 执行加法运算，与当前的向量相加，并返回新的对象
	 * @method	plusNew
	 * @param	需要加的向量对象
	 */
	plusNew : function ( v ) {
		return new this.constructor( this.x + v.x, this.y + v.y );
	},
	/** 
	 * 执行减法运算，用当前对象减去该对象
	 * @method	minus
	 * @param	需要减的向量对象
	 */
	minus : function ( v ) {
		this.x -= v.x;
		this.y -= v.y;
	},
	/** 
	 * 执行减法运算，用当前对象减去该对象，并返回新的对象
	 * @method	minusNew
	 * @param	需要减的向量对象
	 */
	minusNew : function ( v ) {
		return new this.constructor( this.x - v.x, this.y - v.y );
	},
	/** 
	 * 反转一个向量，对它求逆，需要分别乘以-1，其实就是旋转180度
	 * @method	negate
	 */
	negate: function () {
		this.x = - this.x;
		this.y = - this.y;
	},
	/** 
	 * 反转一个向量，对它求逆，并返回新的对象
	 * @method	negateNew
	 */
	negateNew: function () {
		return new this.constructor( -this.x, -this.y );
	},
	/** 
	 * 将向量按指定的系数进行相乘，可以理解成缩放
	 * @method	multiplyScalar
	 * @param	系数，标量scalar
	 */
	multiplyScalar: function ( scalar ) {
		this.x *= scalar;
		this.y *= scalar;
	},
	multiplyScalarNew: function ( scalar ) {
		return new this.constructor( this.x * scalar, this.y * scalar );
	},
	/** 
	 * 向量的长度，代表了向量的大小，或向量的"绝对值"或"模"，利用了勾股定理得出
	 * @method	length
	 * @param	
	 */
	length: function () {
		return Math.sqrt( this.x * this.x + this.y * this.y );
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
	 * 两个向量根据某种规则相乘，得到一个数字，称为“点积”或“数量积”，两个分量乘积相加
	 * @method	dot
	 * @param	目标向量
	 */
	dot: function ( v ) {
		return this.x * v.x + this.y * v.y;
	},
	/** 
	 * 根据当前向量得到与他成90度夹角的向量，这个垂直的向量称为原向量的法向量
	 * 将x和y分量交换，然后将随便一个取反，就得到原向量的法向量
	 * 注意，法向量可能有2个方向，方向正好相反，但都与原向量垂直
	 * @method	getNormal
	 * @param	
	 */
	getNormal: function () {
		return new this.constructor( - this.y, this.x );
	},
	/** 
	 * 测试当前向量是否与另一个向量垂直，若为0，则垂直，返回true
	 * @method	isPerpTo
	 * @param	目标向量
	 */
	isPerpTo: function ( v ) {
		return ( this.dot( v ) == 0 );
	},
	/** 
	 * 两个向量的夹角，这个直接有方程http://blog.csdn.net/sevencolorfish/article/details/6845871
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
	 * 向量的绕Z轴旋转，参考旋转公式http://zhidao.baidu.com/question/562549647.html?fr=qrl&index=1&qbl=topic_question_1
	 * @method	rotate
	 * @param	接受一个度为单位的角
	 */
	rotate: function ( deg ) {
	    var ca = Math.cos( this.degToRad(deg) );
	    var sa = Math.sin( this.degToRad(deg) );
	    var x = this.x, 
			y = this.y;
        var rx = x * ca - y * sa;
        var ry = x * sa + y * ca;
        this.x = rx;
        this.y = ry;
	},
	/** 
	 * 向量的旋转，并返回新向量
	 * @method	rotateNew
	 * @param	接受一个度为单位的角
	 */
	rotateNew: function ( deg ) {
		var v = new this.constructor( this.x, this.y ); 
		v.rotate( deg );
		return v;
	},
	/** 
	 * 获取向量的角度值
	 * @method	getDegree
	 * @param	
	 */
	getDegree: function () {
	    return this.radToDeg( Math.atan2( this.y, this.x ) );
	},
	/** 
	 * 设置向量的角度值
	 * @method	setDegree
	 * @param	接受一个度为单位的角
	 */
	setDegree: function (deg) {
		var r = this.length();
		this.x = r * Math.cos( this.degToRad(deg) );
		this.y = r * Math.sin( this.degToRad(deg) );
	}

};
