var QueuePublic = (function() {
    var privateData = new WeakMap();

    function Queue() {
        privateData.set(this, {
            list: new LinkedListPublic()
        });
    }

    Queue.prototype.enqueue = function(value) {
        privateData.get(this).list.append(value);
    }

    Queue.prototype.peek = function() {
        return privateData.get(this).list.getHead();
    }

    Queue.prototype.isEmpty = function() {
        return privateData.get(this).list.getHead() === null ? true : false;
    }

    Queue.prototype.dequeue = function() {
        var node = privateData.get(this).list.getHead();

        if (node === null) {
            return null;
        }

        privateData.get(this).list.delete(node.getValue());

        return node.getValue();
    }

    return Queue;
})()