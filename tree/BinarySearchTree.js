var import2 = import ('./TreeNode.js').then(function(result) {
    createClosure();
    TreeNodePublic = result;
    console.log(TreeNodePublic.TreeNodePublic);
});

//import {TreeNodePublic} from './TreeNode.js';

var BinarySearchTreePublic;
var TreeNodePublic;

function createClosure() {
    BinarySearchTreePublic = (function() {
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
        }

        return BinarySearchTree;
    })();
}

//createClosure();