var StackPublic = (function() {
    var privateData = new WeakMap();

    function Stack() {
        privateData.set(this, {
            list: new LinkedListPublic()
        });
    }

    Stack.prototype.push = function(value) {
        privateData.get(this).list.prepend(value);
    }

    Stack.prototype.peek = function() {
        return privateData.get(this).list.getHead();
    }

    Stack.prototype.isEmpty = function() {
        return privateData.get(this).list.getHead() === null ? true : false;
    }

    Stack.prototype.pop = function() {
        var node = privateData.get(this).list.getHead();

        if (node === null) {
            return null;
        }

        privateData.get(this).list.delete(node.getValue());

        return node.getValue();
    }

    return Stack;
})()