const { random } = require('lodash');

const MATH_OPERATIONS = ['+', '-', 'x', ':'];
const MATH_MAPPING = {
  '+': (firstValue, secondValue) => firstValue + secondValue,
  '-': (firstValue, secondValue) => firstValue - secondValue,
  'x': (firstValue, secondValue) => firstValue * secondValue,
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
  let leftHandSide = random(lowerBound, upperBound);
  let rightHandSide = random(lowerBound, upperBound);
  let mathOperationIndex = random(MATH_OPERATIONS.length - 1, false);
  let mathOperationChosen = MATH_OPERATIONS[mathOperationIndex];
  if (MATH_OPERATIONS[mathOperationIndex] !== ':') {
    let result = {}
    if (mathOperationChosen === "-"){
      if(rightHandSide > leftHandSide){
        n = leftHandSide
        leftHandSide = rightHandSide
        rightHandSide = n 
        result = MATH_MAPPING[mathOperationChosen](leftHandSide, rightHandSide);
      } else {
        result = MATH_MAPPING[mathOperationChosen](leftHandSide, rightHandSide);
      }
    } else {
      result = MATH_MAPPING[mathOperationChosen](leftHandSide, rightHandSide);
    }
    return {
      leftHandSide,
      rightHandSide,
      result,
      mathString: `${leftHandSide} ${mathOperationChosen} ${rightHandSide}`,
    };
  }
  let { result, divider } = MATH_MAPPING[':'](rightHandSide);
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
