var HashTablePublic = (function() {
    var privateData = new WeakMap();

    function HashTable(slots = 4) {
        privateData.set(this, {
            slots: slots,
            size: 0,
            buckets: createEmptyBuckets(slots),
            keys: new Set(),
        });
    }

    function createEmptyBuckets(size) {
        return Array(size).fill(null).map(() => new LinkedListPublic());
    }

    /*
        in order to change buckets to new array reasign, slots and size change
         we need to pass the whole currrenthashtable object
         we use wrapper to not to compile all the code if we dont need ot rehash

         this is used because we need reference to set all nodes using set


    */
    function rehash(currentHashTable) {
        ({slots, size, buckets} = currentHashTable);

        if (size/slots < 0.75) {
            return;
        }

        rehashWrapper.call(this);

        /**
         * change values of our hashTable objects.
         */
        function rehashWrapper() {
            function actualRehash() {
                    slots = slots * 2;
                    size = 0;
                    buckets = createEmptyBuckets(slots);
            }

            /**
             * we need to save the reference to old buckets to iterate over them
             * and setting to new loactions
             */
            function actualRehashValues() {
                var oldBuckets = currentHashTable.buckets;

                actualRehash();

                currentHashTable.slots = slots;
                currentHashTable.size = size;
                currentHashTable.buckets = buckets;

                //console.log(JSON.stringify(currentHashTable, null, 4));

                oldBuckets.map((linkedList) => {
                    var node = linkedList.getHead();
                    //console.log(node);

                    while(node !== null) {
                        const {key, value} = node.getValue();
                        this.set(key, value, false);

                        node = node.getNext();
                    }
                });
            }

            actualRehashValues.call(this);
        }
    }

    /**
     * hash(s)=s[0]+s[1]⋅p+s[2]⋅p^2+...+s[n−1]⋅p^(n−1) mod m = ∑i=0 n−1 s[i]⋅p^i mod m
     */
    HashTable.prototype.hash = function(key) {
        key = String(key);

        if (!key instanceof String) {
            throw new Error("not a string");
        }

        const hashArray = key.split("");
        const p = 31;
        const m = Math.pow(2, 64);

        let hashValue = hashArray.reduce(
            (value, char, index) =>
                value + char.charCodeAt(0) * Math.pow(p, index)
            , 0);

        hashValue = hashValue % m;

        return hashValue % this.getSlots();
    }

    /**
     * toRehash is used when using set itnernaly when we are setting from rehash
     *
     * hashKey must be computed after rehashing othwerwise the value then triggered
     * rehash will have wrong hashkey(old one).
     *
     * 2 possibiltires, either key already exists so we udpate the value
     * or it's new so we appned to correct linkedList
     *
     * keys is of Set type so it can be after everything but we change size
     * only when adding new not updatign existing, so for consistency we put it
     * in if
     */
    HashTable.prototype.set = function(key, value, toRehash = true) {
        var currentHashTable = privateData.get(this);

        toRehash && rehash.call(this, currentHashTable);

        let hashKey = this.hash(key);

        //console.log(hashKey + " " + key + " " + value + this.getSlots());

        //console.log(JSON.stringify(currentHashTable, null, 4));

        /*for (value of this) {
            console.log(value.value);
        }*/

        let node = currentHashTable.buckets[hashKey].find(null,
            (nodeValue) => nodeValue.key === key);

        const valueWrapper = {
            key: key,
            value: value,
        };

        if (node === null) {
            currentHashTable.buckets[hashKey].append(valueWrapper);
            currentHashTable.size++;
            currentHashTable.keys.add(key);
        } else {
            valueWrapper.key = node.getValue().key;
            node.setValue(valueWrapper);
        }
    }

    /**
     * we delete using callback for key and return true if deleted
     */
    HashTable.prototype.delete = function(key) {
        var hashKey = this.hash(key);
        var currentHashTable = privateData.get(this);

        //console.log(currentHashTable.buckets[hashKey].getHead());

        const deleted = currentHashTable.buckets[hashKey].delete(
            null, (valueObject) => {//console.log(valueObject + "abcsad " + key );
            return valueObject.key === key;}
        );

        if (deleted) {
            currentHashTable.keys.delete(key);
            currentHashTable.size--;
        }

        return deleted
    }

    HashTable.prototype.get = function(key) {
        var hashKey = this.hash(key);
        var currentHashTable = privateData.get(this);

        const node = currentHashTable.buckets[hashKey].find(null,
            (valueObject) => valueObject.key === key);

        return node !== null ? node.getValue().value: null;
    }

    HashTable.prototype.getSlots = function() {
        return privateData.get(this).slots;
    }

    HashTable.prototype.has = function(key) {
        return privateData.get(this).keys.has(key);
    }

    HashTable.prototype.keys = function() {
        return Array.from(privateData.get(this).keys);
    }

    HashTable.prototype[Symbol.iterator]= function * () {
        var currentHashTable = privateData.get(this);

        //console.log(currentHashTable);

        if (currentHashTable.size === 0) {
            return new IteratorResultPublic(null).getResult();
        }

        for (let i = 0; i < currentHashTable.slots; i++) {
            if (currentHashTable.buckets[i].getHead() !== null) {
                yield * currentHashTable.buckets[i][Symbol.iterator]();
            }
        }

        return new IteratorResultPublic(null).getResult();
    }


    return HashTable;
})()