var inheritance;
var delagation;

{
    function Foo(who) {
        this.me = who;
    }

    Foo.prototype.identify = function() {
        return "I am " + this.me;
    }

    function Bar(who) {
        Foo.call(this, who);
    }
    Bar.prototype = Object.create(Foo.prototype);

    Bar.prototype.speak = function() {
        console.log.call(this, "Hello " + this.identify() + ".");
    }

    inheritance = Bar;
}

{

    var Foo = {
        init(who) {
            this.me = who;
        },
        identify()  {
            return "I am " + this.me;
        }
    };

    var Bar = Object.create(Foo);

    Bar.speak = function() {
        console.log.call(this, "Hello " + this.identify() + ".");
    }

    delagation = Bar;
}

export {inheritance, delagation};