/*var import2 = import ('./TreeNode.js').then(function(result) {
    BinarySearchTreePublic = createClosure();
    //console.log(BinarySearchTreePublic);
    TreeNodePublic = result;
    //console.log(TreeNodePublic.TreeNodePublic);
});*/

/*var BinarySearchTreePublic;
var TreeNodePublic;*/


import {TreeNodePublic} from './TreeNode.js';

var BinarySearchTreePublic = createClosure();

function createClosure() {
    console.log("ka de sam");
    return BinarySearchTreePublic = (function() {
        var privateData = new WeakMap();

        var BinarySearchTree = function() {
            privateData.set(this, {
                size: 0,
                root: null,
            });
        }

        BinarySearchTree.prototype.getSize = function() {
            return privateData.get(this).size;
        }

        BinarySearchTree.prototype.getRoot = function() {
            return privateData.get(this).root;
        }

        BinarySearchTree.prototype.add = function(value) {
            var treeNode = new TreeNodePublic(value);

            var root = privateData.get(this).root;
            if (root === null) {
                privateData.get(this).root = treeNode;
                increaseSize(this);
                return;
            }

            let smaller = calculateValuePosition(value, root.getValue());
            if (smaller === null) {
                return;
            }

            let currentNode = root;
            let nextNode = getNextNode(smaller, root);

            while (nextNode !== null) {
                smaller = calculateValuePosition(value, nextNode.getValue());
                if (smaller === null) {
                    return;
                }

                currentNode = nextNode;
                nextNode = getNextNode(smaller, currentNode);
            }

            connectNode(currentNode, treeNode, smaller);
            increaseSize(this);
        }

        function connectNode(currentNode, newNode, smaller) {
            if (smaller) {
                currentNode.setLeft(newNode);
            } else {
                currentNode.setRight(newNode);
            }
        }

        function getNextNode(smaller, treeNode) {
            return smaller === true ? treeNode.getLeft() : treeNode.getRight();
        }

        function calculateValuePosition(value, existingValue) {
            var smaller;

            if (value < existingValue) {
                smaller = true;
            } else if (value > existingValue) {
                smaller = false;
            } else {
                smaller = null;
            }

            if (smaller === undefined) {
                throw new Error("somehtign worn");
            }

            return smaller;
        }

        function increaseSize(bst) {
            privateData.get(bst).size++;
        }

        return BinarySearchTree;
    })();
}

export {BinarySearchTreePublic};

//createClosure();