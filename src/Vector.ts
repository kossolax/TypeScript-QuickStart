export class Vector {
	public x: number;
	public y: number;
	public static zero: Vector = new Vector(0, 0);

	constructor(_x?: number, _y?: number) {
		this.x = _x || 0;
		this.y = _y || 0;
		return this;
	}
	public lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	public length() {
		return Math.sqrt(this.lengthSq());
	}
	public subtract(s: Vector) {
		return new Vector(this.x-s.x, this.y-s.y);
	}	
}
export class Segment {
	private src: Vector;
	private dst: Vector;

	constructor(_src: Vector, _dst: Vector) {
		this.src = _src;
		this.dst = _dst;
	}
	public length() {
		return this.src.subtract(this.dst).length();
	}
}
