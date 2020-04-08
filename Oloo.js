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

}

export {inheritance, delagation};