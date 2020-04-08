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


    TreeNode.prototype.getValue() = function() {
        return privateData.get(this).value;
    }

    TreeNode.prototype.getParent() = function() {
        return privateData.get(this).parent;
    }

    TreeNode.prototype.getLeft() = function() {
        return privateData.get(this).left;
    }

    TreeNode.prototype.getRight() = function() {
        return privateData.get(this).right;
    }

    TreeNode.prototype.setValue() = function(value) {
        privateData.get(this).value = value;
    }

    TreeNode.prototype.setLeft() = function(left) {
        privateData.get(this).left = left;
    }

    TreeNode.prototype.setRight() = function(right) {
        privateData.get(this).right = right;
    }

    TreeNode.prototype.setParent() = function(parent) {
        privateData.get(this).parent = parent;
    }

    return TreeNode;
})();