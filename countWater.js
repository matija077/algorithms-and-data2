/**
 *
 * @param {Array<Number>} water  - array of brick heights at given index
 * @returns {Number}  - hoiw much water can we store between bricks
 */

function countWater(water) {
    var result = 0;
    let index = 0;

    for (let element of water) {
        let maxleft = 0; maxRight = 0;

        for (let i = index; i >= 0; i--) {
            maxleft = Math.max(maxleft, water[i]);
        }
        for (let i = index; i < water.length; i++) {
            console.log(i + " " + index + " " +  water.length);
            maxRight = Math.max(maxRight, water[i]);
        }

        //console.log(water.length);

        result += Math.min(maxleft, maxRight) - element;
        index++;
    }

    return result;
}