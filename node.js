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
        privateData.set(this,
            {
                value: value,
                next: null,
                previous: null,
            });
        this.descriptor = value;
    }

    Node.prototype.getValue = function() {
        return privateData.get(this).value;
    }

    Node.prototype.getNext = function() {
        //console.log(privateData);
        return privateData.get(this).next;
    }

    Node.prototype.getPrevious = function() {
        //console.log(privateData);
        return privateData.get(this).previous;
    }

    Node.prototype.setValue = function(value) {
        privateData.get(this).value = value;
    }

    Node.prototype.setNext = function(next) {
        if (!next instanceof Node) {
            throw new Error(`next must be instance of ${Node} class`);
        }

        privateData.get(this).next = next;
    }

    Node.prototype.setPrevious = function(previous) {
        if (!next instanceof Node) {
            throw new Error(`previous must be instance of ${Node} class`);
        }

        privateData.get(this).previous = previous;
    }

    return Node;
})();

