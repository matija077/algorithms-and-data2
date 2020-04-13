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

        /**
         * we need to create new node, find apropriate position, check if node with
         * that value already exist. if not then connect and icnrease size.
         *
         * we check for existign node using {calculateValuePosition}. if it's null we know ndoe exists.
         * and we return
         * we use {getNextNode} to fetch next node.
         * if does not exisst we use {connectNode} and {increaseSize}
         * @param {any} value
         */
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

        /**
         * based on whether the value is smaller or greater connect nodes.
         * @param {TreeNode} currentNode -
         * @param {TreeNode} newNode -
         * @param {Enum: {true, false, null}} smaller
         */
        function connectNode(currentNode, newNode, smaller) {
            if (smaller) {
                currentNode.setLeft(newNode);
            } else {
                currentNode.setRight(newNode);
            }
        }

        /**
         * based on whetehr the value is smallor greater get next Node
         * @param {Touple: {true, false, null}}} smaller
         * @param {TreeNode} treeNode
         */
        function getNextNode(smaller, treeNode) {
            return smaller === true ? treeNode.getLeft() : treeNode.getRight();
        }

        /**
         * based on difference between values of two nodes return wheter or not
         * value is samller or bigger than existingValue.  if it is the same return null
         * if it is undefined some errror occured in the check
         * @param {any} value
         * @param {any} existingValue
         * @returns Enum: {true, false, null}}
         */
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

        /**
         * increase size of given BinarySearchTree
         * @param {BinarySearchTree} bst
         */
        function increaseSize(bst) {
            privateData.get(bst).size++;
        }

        /**
         * based on {calculateValuePosition} if return is null value provided
         * is the same as the one in the tree.
         * @param {any} value
         * @returns {Boolean}
         */
        BinarySearchTree.prototype.contains = function(value) {
            var exists;
            var treeNode = this.getRoot();

            while(treeNode !== null) {
                exists = calculateValuePosition(value, treeNode.getValue());
                if (exists === null) {
                    return true;
                }

                treeNode = getNextNode(exists, treeNode);
            }

            return false;
        }

        BinarySearchTree.prototype.remove = function(value) {

        }

        return BinarySearchTree;
    })();
}

export {BinarySearchTreePublic};

//createClosure();