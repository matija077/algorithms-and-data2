function parent() {
    this.parentProperty = "a";
}

parent.prototype.render =  function render() {
    console.log("parent");
}

function child() {
    parent.call(this);

    this.childProperty = "b";
}
Object.setPrototypeOf(child, parent);
child.prototype = Object.create(parent.prototype);
child.prototype.constructor = child;

child.prototype.play = function play(val) {
    console.log(val);
}

export {parent, child};


