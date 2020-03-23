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

    LinkedList.prototype.getHead = function() {
        //console.log(privateData);
        return privateData.get(this).head;
    }

    LinkedList.prototype.getTail = function() {
        return privateData.get(this).tail;
    }

    return LinkedList;
})();

//export default LinkedListPublic;