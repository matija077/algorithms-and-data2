var obj = {a: 1, b: 3,
    foo() {
        console.log("obj a" + this.a);
    },
}
    handlers = {
        get(target, key, context) {
            if (Reflect.has(target, key)) {
                return Reflect.get(target, key, context);
            } else {
                throw "no such method";
            }
        },
        set(target, key, val, context) {
            if (Reflex.has(target, key)) {
                return Reflect.set(target, key,val, context);
            } else {
                throw "no such method";
            }
        }
    },
    proxyObj = new Proxy(obj, handlers)
    parentA = {
        b: 2
    };

    Object.setPrototypeOf(obj, parentA);

console.log(obj.a);

obj.b = 4;
console.log(obj);
var {a: prvi = 0, b: drugi = 0} = obj;
console.log(prvi);

console.log(proxyObj.a);
//console.log(proxyObj.ala);

function def() {
    console.log(test);
    var arr = [1, 2];

    if (true) {
        for (var test of arr) {
            console.log(test);
        }
    }
}

def();

