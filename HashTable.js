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
        in order to change buckets to new array reasign we need to pass the whole currrent
        has table object
    */
    function rehash(currentHashTable) {
        ({slots, size, buckets} = currentHashTable);

        if (size/slots < 0.75) {
            return;
        }

        rehashWrapper.call(this);

        function rehashWrapper() {
            function actualRehash() {
                    slots = slots * 2;
                    size = 0;
                    buckets = createEmptyBuckets(slots);
            }

            function actualRehashValues() {
                var oldBuckets = currentHashTable.buckets;

                actualRehash();

                currentHashTable.slots = slots;
                currentHashTable.size = size;
                currentHashTable.buckets = buckets;

                console.log({currentHashTable});

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

    HashTable.prototype.set = function(key, value, toRehash = true) {
        var hashKey = this.hash(key);
        var currentHashTable = privateData.get(this);

        //console.log(hashKey + " " + key + " " + value);

        toRehash && rehash.call(this, currentHashTable);

        console.log({currentHashTable});

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
        } else {
            valueWrapper.key = node.getValue().key;
            node.setValue(valueWrapper);
        }

        currentHashTable.size++;
        currentHashTable.keys.add(key);
    }

    HashTable.prototype.delete = function(key) {
        var hashKey = this.hash(key);
        var currentHashTable = privateData.get(this);

        console.log(hashKey);

        const deleted = currentHashTable.buckets[hashKey].delete(
            null, (valueObject) => {console.log(valueObject + "abcsad " + key ); return valueObject.key === key;}
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

        console.log(currentHashTable);

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