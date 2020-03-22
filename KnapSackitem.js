export default function KnapSackItem(value, weight, itemInStock = 1) {
    this.value = value;
    this.weight = weight;
    this.itemInStock = itemInStock;
    this.quantity = 1;
}

Object.defineProperties(KnapSackItem.prototype, {
    totalValue: {get: function() { return this.value } },
    totalWeight: {get: function() { return this.value } },
    valuePerWeigth: {get: function() { return this.value/this.weight } },
    [Symbol.toStringTag]: {get: function() { return `v${this.value} w${this.weight} x ${this.quantity}` }},
    //[Symbol.toStringTag]: {get: function() { return `KnapSackItem` }}
});