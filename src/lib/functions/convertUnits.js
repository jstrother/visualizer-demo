export default function convertUnits(chosenUnit, measurement) {
  // this function will convert all other units into inches for use elsewhere and to make things simpler
  if (chosenUnit === 'inches') {
    return {
      unit: 'inches',
      value: measurement
    };
  }

  if (chosenUnit === 'centimeters') {
    return {
      unit: 'centimeters',
      value: measurement * 0.393701
    };
  }

  if (chosenUnit === 'feet') {
    let tempValue = measurement = 12;

    if (measurement % 12 === 0) {
      return {
        units: 'feet',
        value: {
          feet: tempValue,
          inches: 0
        }
      };
    }
    
    let feet = Math.trunc(tempValue);
    let inches = Math.trunc((tempValue - feet) * 12);

    return {
      unit: 'feet',
      value: {
        feet,
        inches
      }
    };
  }
}