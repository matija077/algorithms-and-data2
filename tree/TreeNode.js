var TreeNodePublic = (function() {
    var privateData = new WeakMap();

    var TreeNode = function(value = null) {
        privateData.set(this, {
            value: value,
            parent: null,
            left: null,
            right: null,
        });
    }

    function getPrivateData(object) {
        return object.privateData.get(object);
    }

    TreeNode.prototype.getValue = function() {
        return privateData.get(this).value;
    }

    TreeNode.prototype.getParent = function() {
        return privateData.get(this).parent;
    }

    TreeNode.prototype.getLeft = function() {
        return privateData.get(this).left;
    }

    TreeNode.prototype.getRight = function() {
        return privateData.get(this).right;
    }

    TreeNode.prototype.setValue = function(value) {
        privateData.get(this).value = value;
    }

    TreeNode.prototype.setLeft = function(treeNode) {
        privateData.get(this).left = treeNode;
        treeNode.setParent(this);
    }

    TreeNode.prototype.setRight = function(treeNode) {
        privateData.get(this).right = treeNode;
        treeNode.setParent(this);
    }

    TreeNode.prototype.setParent = function(treeNode) {
        privateData.get(this).parent = treeNode;
    }

    return TreeNode;
})()

//export {TreeNodePublic};