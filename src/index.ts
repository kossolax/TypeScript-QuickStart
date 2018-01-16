import { Vector, Segment } from "./Vector"

function init() {
    let a: Vector;          // a typé explicitement
    const b = new Vector(); // b typé implicitement en Vector
    a = new Vector(1, 1);

    const x = new Segment(a, b);
    window.alert(x.length() == Math.sqrt(2));
    console.error(a, b, x);
}



init();