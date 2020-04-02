var HashTablePublic = (function() {
    var privateData = new WeakMap();

    function HashTable(slots = 4) {
        privateData.set(this, {
            slots: slots,
            size: 0,
            buckets: createEmptyBuckets(slots),
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

        if (size/slots >= 0.75) {
            function actualRehash() {
                slots = slots * 2;
                size = 0;
                buckets = createEmptyBuckets(slots);
            }

            function actualRehashValues() {
                var oldBuckets = currentHashTable.buckets;
                currentHashTable.buckets = buckets;

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

            actualRehash();
            actualRehashValues.call(this);

            currentHashTable.size = size;
            currentHashTable.slots = slots;
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

        //console.log(currentHashTable);

        //toRehash && rehash.call(this, currentHashTable);

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
    }

    HashTable.prototype.getSlots = function() {
        return privateData.get(this).slots;
    }

    HashTable.prototype[Symbol.iterator]= function * () {
        var currentHashTable = privateData.get(this);

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