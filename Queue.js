var QueuePublic = (function() {
    var privateData = new WeakMap();

    function Queue() {
        privateData.set(this, {
            list: new LinkedListPublic()
        });
    }

    Queue.prototype.push = function(value) {
        privateData.get(this).list.prepend(value);
    }

    Queue.prototype.peek = function() {
        return privateData.get(this).list.getHead();
    }

    Queue.prototype.isEmpty = function() {
        return privateData.get(this).list.getHead() === null ? true : false;
    }

    Queue.prototype.pop = function() {
        var node = privateData.get(this).list.getHead();

        if (node === null) {
            return null;
        }

        privateData.get(this).list.delete(node.getValue());

        return node.getValue();
    }

    return Queue;
})()