class parent {
    constructor() {
        this.parentProperty = "a";
    }

    render() {
        console.log("parent");
    }
};

class child extends parent {
    constructor() {
        super();

        this.childProperty = "b";
    }

    play(val) {
        console.log(val);
    }
};

export {parent, child};