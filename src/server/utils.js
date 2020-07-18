const { random } = require('lodash');

const MATH_OPERATIONS = ['+', '-', 'x', ':'];
const MATH_MAPPING = {
  '+': (firstValue, secondValue) => firstValue + secondValue,
  '-': (firstValue, secondValue) => firstValue - secondValue,
  x: (firstValue, secondValue) => firstValue * secondValue,
  ':': divisor => {
    const result = random(1, 10);
    const divider = result * divisor;
    return {
      result,
      divider,
    };
  },
};

function getRandomMath(lowerBound, upperBound) {
  const leftHandSide = random(lowerBound, upperBound);
  const rightHandSide = random(lowerBound, upperBound);
  const mathOperationIndex = random(MATH_OPERATIONS.length - 1, false);
  const mathOperationChosen = MATH_OPERATIONS[mathOperationIndex];
  if (MATH_OPERATIONS[mathOperationIndex] !== ':') {
    const result = MATH_MAPPING[mathOperationChosen](leftHandSide, rightHandSide);
    return {
      leftHandSide,
      rightHandSide,
      result,
      mathString: `${leftHandSide} ${mathOperationChosen} ${rightHandSide} = ?`,
    };
  }
  const { result, divider } = MATH_MAPPING[':'](rightHandSide);
  return {
    leftHandSide: divider,
    rightHandSide,
    result,
    mathString: `${divider} ÷ ${rightHandSide}`,
  };
}

module.exports = {
  getRandomMath,
};
