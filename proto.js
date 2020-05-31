function parent() {
}

parent.prototype.render =  function render() {
    console.log("parent");
}

function child() {

}
//Object.setPrototypeOf(child, parent);
child.prototype = new parent();
child.prototype.constructor = child;

child.prototype.play = function play(val) {
    console.log(val);
}

export {parent, child};


