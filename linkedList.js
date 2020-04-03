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
           // console.log("no " + value);
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

    /**
     * has to be able to provide true for deltee and callback
     */
    LinkedList.prototype.delete = function(value, callback = undefined) {
        var currentLinkedList = privateData.get(this);
        var found = false;

        if (currentLinkedList.head === null){
            return found;
        }

        /*if (currentLinkedList.head.getNext() === null) {
            currentLinkedList.head = currentLinkedList.tail = null;
            return true;
        }*/

        let currentNode = currentLinkedList.head;
        let nextNode = currentNode;
        let firstPass = true;

        while(nextNode !== null) {
            if ((callback && callback(nextNode.getValue())) ||
            nextNode.getValue() === value) {
                found = true;
                break;
            }

            if (firstPass) {
                nextNode = currentNode.getNext();
                firstPass = false;
            } else {
                currentNode = nextNode;
                nextNode = nextNode.getNext();
            }
        }

        if (found) {
            currentNode.setNext(nextNode.getNext());
            if (nextNode.getNext() === null) {
                currentLinkedList.tail = currentNode;
            }
            /*if (currentLinkedList.head.getValue() === value) {
                currentLinkedList.head = currentNode.getNext();
            }*/
            if (found && firstPass) {
                currentLinkedList.head = currentNode.getNext();
            }
        }

        return found;
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

    LinkedList.prototype[Symbol.iterator] = function *() {
        var head = privateData.get(this).head;
        var result;

        if (head === null) {
            return new IteratorResultPublic(null).getResult();
        }

        while(head !== null) {
            result = new IteratorResultPublic(head.getValue());

            yield result.getResult();

            head = head.getNext();
        }

        return new IteratorResultPublic(null).getResult();
    }

    return LinkedList;
})();

//export default LinkedListPublic;