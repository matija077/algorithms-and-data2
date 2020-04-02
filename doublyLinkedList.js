var DoublyLinkedListPublic = ( function() {
    var privateData = new WeakMap();

    var DoublyLinkedList = function(node = null) {
        privateData.set(this, {
            head: node,
            tail: node
        });
    }

    DoublyLinkedList.prototype.append = function(value = null) {
        //({newNode, currentDoublyLinkedList, exit} = addPrependHelper.call(this, value));
        //console.log(currentDoublyLinkedList);
    }

    return DoublyLinkedList;
})();