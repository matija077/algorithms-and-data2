function SomeClass(value) {
    this.value = value;
}

SomeClass.prototype.map = function(f) {
    return new SomeClass(f(this.value));
}

function Obo(obj) {
    this.obj = obj;
}

Obo.prototype.map = function(f) {
    var temp = {};
    for (key of Object.keys(this.obj)) {
        temp[key] = f(this.obj[key]);
    }

    return new Obo(temp);
}

Obo.prototype.chain = function(f) {

}

Obo.prototype.extract = function() {
    return this.obj;
}

Obo.prototype.extend = function(f) {
    new Obo(f(this))
}

function pipe (...functions) {
    return function(x) {
        //debugger;
        return functions.reduceRight(
            function(p, c) {
               //debugger;
                return c(p);
            },
            x
        );
    }
}

function average(arr) {
    console.log(arr);
    var c = arr.reduce(function(a, b) {
        a += b;
    }, 0);

    return c / arr.size;
}

function trace(label) {
    return function(value) {
        console.log(`${label} : ${value}`);
        return value;
    };
}

{
    const composeM = chainMethod => (...ms) => (
      ms.reduce((f, g) => x => g(x)[chainMethod](f))
    );

    const composePromises = composeM('then');

    const label = 'API call composition';

    // a => Promise(b)
    const getUserById = id => id === 3 ?
      Promise.resolve({ name: 'Kurt', role: 'Author' }) :
      undefined
    ;

    // b => Promise(c)
    const hasPermission = ({ role }) => (
      Promise.resolve(role === 'Author')
    );

    // Compose the functions (this works!)
    const authUser = composePromises(hasPermission, getUserById);

    authUser(3).then(trace(label)); // true
  }