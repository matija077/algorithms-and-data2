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

                oldBuckets.map(function(slot, index) {
                    buckets[index] = slot;
                });
            }

            actualRehash();
            actualRehashValues();

            currentHashTable.size = size;
            currentHashTable.slots = slots;
            currentHashTable.buckets = buckets;
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

    HashTable.prototype.set = function(key, value) {
        var hashKey = this.hash(key);
        var currentHashTable = privateData.get(this);

        console.log(hashKey + " " + currentHashTable);

        //rehash(currentHashTable);

        let node = currentHashTable.buckets[hashKey].find(null,
            (nodeValue) => nodeValue.key === key);

            console.log(node);

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

        for (node of currentHashTable.buckets[hashKey]) {
            console.log(node.value);
        }

        console.log(privateData.get(this).slots);
        console.log(privateData.get(this).size);
    }

    HashTable.prototype.getSlots = function() {
        return privateData.get(this).slots;
    }


    return HashTable;
})()