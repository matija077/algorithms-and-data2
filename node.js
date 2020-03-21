function Node(value = null) {
    //var value = value;

    return {
    };


}

Object.defineProperties(Node.prototype, {
    'value' : { get: function() {return this.value} },
    'value' : {set: function(value) {

        if (value === 2) {
        console.log("why");
        this.value = value}} }
}

);

function createNode(value = null) {
    var _value = value;

    return {
        getValue() {
            return _value;
        },
        setValue(value) {
            _value = value;
        }
    };
}

var NodeNode = (function() {
    var privateData = new WeakMap();

    function Node(value) {
        privateData.set(this, { value: value});
    }

    Node.prototype.getvalue = function() {
        return privateData.get(this).name;
    }

    return Node;
})();

