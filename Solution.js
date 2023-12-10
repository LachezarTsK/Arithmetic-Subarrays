
/**
 * @param {number[]} input
 * @param {number[]} left
 * @param {number[]} right
 * @return {boolean[]}
 */
var checkArithmeticSubarrays = function (input, left, right) {
    this.minValue = 0;
    this.maxValue = 0;
    this.numberOfElements = 0;

    const arithmeticSubarrays = new Array();
    let numberOfSubarrays = left.length;
    for (let i = 0; i < numberOfSubarrays; ++i) {
        arithmeticSubarrays.push(isArithmeticSubarray(input, left[i], right[i]));
    }
    return arithmeticSubarrays;
};

/**
 * @param {number[]} input
 * @param {number[]} left
 * @param {number[]} right
 * @return {boolean}
 */
function isArithmeticSubarray(input, left, right) {
    this.numberOfElements = right - left + 1;
    this.minValue = Number.MAX_SAFE_INTEGER;
    this.maxValue = Number.MIN_SAFE_INTEGER;
    for (let i = left; i <= right; ++i) {
        this.minValue = Math.min(this.minValue, input[i]);
        this.maxValue = Math.max(this.maxValue, input[i]);
    }

    if ((this.maxValue - this.minValue) % (this.numberOfElements - 1) !== 0) {
        return false;
    }

    return allElementsBelongToTheExpectedArithmeticProgression(input, left, right);
}

/**
 * @param {number[]} input
 * @param {number[]} left
 * @param {number[]} right
 * @return {boolean}
 */
function allElementsBelongToTheExpectedArithmeticProgression(input, left, right) {
    if (this.minValue === this.maxValue) {
        return true;
    }

    const visited = new Array(this.maxValue - this.minValue + 1).fill(false);
    for (let i = left; i <= right; ++i) {
        visited[input[i] - this.minValue] = true;
    }

    let expectedStep = (this.maxValue - this.minValue) / (this.numberOfElements - 1);
    let currentValue = this.minValue;

    for (let i = 0; i < this.numberOfElements; ++i) {
        if (!visited[currentValue - this.minValue]) {
            return false;
        }
        currentValue += expectedStep;
    }
    return true;
}
