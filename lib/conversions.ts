export function gramsToOunces(gms: number) {
  const nearExact = gms / 28.34952;
  const oz = Math.round(nearExact);
  return oz;
}

export function gramsToPoundsAndOunces(gms: number) {
  const nearExact = gms / 1000 / 0.45359237;
  const lbs = Math.floor(nearExact);
  const oz = Math.round((nearExact - lbs) * 16);
  return {
    pounds: lbs,
    ounces: oz,
  };
}

export function gramsToFluidOunces(gms: number) {
  let weightInFlOz = gms / 28.35;
  weightInFlOz = Math.round((weightInFlOz + Number.EPSILON) * 100) / 100;
  return weightInFlOz;
}

export function gramsToMilkMillilitres(gms: number) {
  let milkWeight = gms / 1.02;
  milkWeight = Math.round((milkWeight + Number.EPSILON) * 100) / 100;
  return milkWeight;
}

export function ouncesToPoundsAndOunces(ozs: number) {
  const poundAndOunces = {
    pounds: 0,
    ounces: 0.0,
  };

  if (ozs !== 0) {
    const dividend = ozs / 16;
    poundAndOunces.pounds = Math.trunc(dividend);
    const remainder = dividend % 1;
    poundAndOunces.ounces = remainder * 16;
  }

  return poundAndOunces;
}

export function weightWithUnit(weightValue: number, unit: string) {
  let weightWithUnit = '';

  // if (weightValue === 0) console.log('input weight: ZERO', weightValue);

  switch (unit) {
    case 'gm':
      //no conversion
      weightWithUnit = weightValue.toString() + ' gm';
      break;
    case 'ml':
      //no conversion: assuming fluid is water - density = 1 gm/ml
      weightWithUnit = weightValue.toString() + ' ml';
      break;
    case 'ml milk':
      weightWithUnit = weightValue.toFixed(0) + ' ml 🥛';
      break;
    case 'fl oz':
      weightWithUnit = weightValue.toFixed(1) + ' fl oz';
      break;
    case 'lb oz':
      const poundsAndOunces = ouncesToPoundsAndOunces(weightValue);
      weightWithUnit =
        poundsAndOunces.pounds.toString() +
        ' lb ' +
        poundsAndOunces.ounces.toFixed(1) +
        ' oz';
      break;
  }
  return weightWithUnit;
}

export function formatReadingWithUnit(reading: number, unit: string) {
  let readingWithUnit = '';

  switch (unit) {
    case 'gm':
      //no conversion
      readingWithUnit = reading.toString() + ' ' + 'gm';
      break;
    case 'ml':
      //no conversion: assuming fluid is water - density = 1 gm/ml
      readingWithUnit = reading.toString() + ' ' + 'ml';
      break;
    case 'ml milk':
      readingWithUnit = reading.toFixed(0) + ' ' + 'ml 🥛';
      break;
    case 'fl oz':
      readingWithUnit = reading.toFixed(1) + ' ' + 'fl oz';
      break;
    case 'lb oz':
      const poundsAndOunces = gramsToPoundsAndOunces(reading);
      readingWithUnit =
        poundsAndOunces.pounds.toString() +
        ' lb ' +
        poundsAndOunces.ounces.toFixed(1) +
        ' oz';
      break;
  }
  return readingWithUnit;
}

export function getConvertedWeightString(reading: number, conversion: string) {
  let readingWithUnit = '';
  switch (conversion) {
    case 'gm-gm':
      //no conversion - only unit to be appended
      readingWithUnit = reading.toString() + ' ' + 'gm';
      break;
    case 'gm-ml':
      //no conversion: assuming fluid is water, unit to be appended
      readingWithUnit = reading.toString() + ' ' + 'ml';
      break;
    case 'ml-ml-milk':
      //no conversion - only unit to be appended
      readingWithUnit = reading.toFixed(0) + ' ' + 'ml 🥛';
      break;
    case 'gm-ml-milk':
      //conversion: convert gms to milk volume, appeng unit
      const milkVol = gramsToMilkMillilitres(reading);
      readingWithUnit = milkVol.toFixed(0) + ' ' + 'ml 🥛';
      break;
    case 'gm-floz':
      const volumeFluidOunces = gramsToFluidOunces(reading);
      readingWithUnit = volumeFluidOunces.toFixed(1) + ' ' + 'fl oz';
      break;
    case 'floz-floz':
      //no conversion - only unit to be appended
      readingWithUnit = reading.toFixed(0) + ' ' + 'fl oz';
      break;
    case 'gm-lboz':
      {
        const poundsAndOunces = gramsToPoundsAndOunces(reading);
        readingWithUnit =
          poundsAndOunces.pounds.toString() +
          ' lb ' +
          poundsAndOunces.ounces.toFixed(1) +
          ' oz';
      }
      break;
    case 'oz-lboz':
      {
        const poundsAndOunces = ouncesToPoundsAndOunces(reading);
        readingWithUnit =
          poundsAndOunces.pounds.toString() +
          ' lb ' +
          poundsAndOunces.ounces.toFixed(1) +
          ' oz';
      }
      break;
    default:
      break;
  }
  return readingWithUnit;
}

export enum Conversions {}
