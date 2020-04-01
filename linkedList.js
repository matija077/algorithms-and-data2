//import {NodeNode} from './node.js';

var LinkedListPublic = (function() {
    var privateData = new WeakMap();

    function LinkedList(head = null) {
        privateData.set(this, {
            head: head,
            tail: head
        });
    }

    function addPrependHelper(value) {
        var newNode = new NodeNode(value);
        const currentLinkedList = privateData.get(this);
        var exit = false;

        if (currentLinkedList.head === null) {
            console.log("no " + value);
            currentLinkedList.head = newNode;
            currentLinkedList.tail = newNode;
            exit = true;
        }

        return {newNode, currentLinkedList, exit};
    }

    LinkedList.prototype.append = function(value) {
        ({newNode, currentLinkedList, exit} = addPrependHelper.call(this, value));

        if (exit) {
            return;
        }

        //console.log(currentLinkedList.tail);
        currentLinkedList.tail.setNext(newNode);
        currentLinkedList.tail = newNode;
    }

    LinkedList.prototype.prepend = function(value) {
        ({newNode, currentLinkedList, exit} = addPrependHelper.call(this, value));

        if (exit) {
            return;
        }

        newNode.setNext(currentLinkedList.head);
        currentLinkedList.head = newNode;
    }

    LinkedList.prototype.delete = function(value) {
        var currentLinkedList = privateData.get(this);

        if (currentLinkedList.head === null){
            return;
        }

        if (currentLinkedList.head.getNext() === null) {
            currentLinkedList.head = currentLinkedList.tail = null;
            return;
        }

        let currentNode = currentLinkedList.head;
        let nextNode = currentNode;
        let firstPass = true;

        while(nextNode.getValue() !== value && nextNode.getNext() !== null) {
            if (firstPass) {
                nextNode = currentNode.getNext();
                firstPass = false;
            } else {
                currentNode = nextNode;
                nextNode = nextNode.getNext();
            }
        }

        if (nextNode.getValue() === value) {
            currentNode.setNext(nextNode.getNext());
            if (nextNode.getNext() === null) {
                currentLinkedList.tail = currentNode;
            }
            if (currentLinkedList.head.getValue() === value) {
                currentLinkedList.head = currentNode.getNext();
            }
        }
    }

    LinkedList.prototype.getHead = function() {
        //console.log(privateData);
        return privateData.get(this).head;
    }

    LinkedList.prototype.getTail = function() {
        return privateData.get(this).tail;
    }

    LinkedList.prototype.find = function(value = null, callback = undefined) {
        var currentLinkedList = privateData.get(this);

        if (currentLinkedList.head === null) {
            return null;
        }

        let currentNode = currentLinkedList.head;

        while (currentNode !== null) {
            if (callback !== undefined && callback(currentNode.getValue())) {
                return currentNode;
            } else if (currentNode.getValue() === value) {
                return currentNode;
            }

            currentNode = currentNode.getNext();
        }

        return null;
    }

    var IteratorResultPrivate = (function () {
        var privateData = new WeakMap();

        function IteratorResult(value = null) {
            var done = value === null? true: false;

            privateData.set(this, {
                value: value,
                done: done,
            });
        }

        IteratorResult.prototype.getResult = function() {
            return {
                value: privateData.get(this).value,
                done: privateData.get(this).done,
            };
        }

        /*IteratorResult.prototype.setValue = function(value) {
            var done = privateData.get(this).done;

            done = done === true ? done : value === null ? true : done;

            privateData.set(this, {
                value: value,
                done: done
            });
        }*/

        return IteratorResult;
    })();

    LinkedList.prototype[Symbol.iterator] = function *() {
        var head = privateData.get(this).head;
        var result;

        if (head === null) {
            return new IteratorResultPrivate(null);
        }

        while(head !== null) {
            result = new IteratorResultPrivate(head.getValue());

            yield result.getResult();

            head = head.getNext();
        }

        return new IteratorResultPrivate(null).getResult();
    }

    return LinkedList;
})();

//export default LinkedListPublic;