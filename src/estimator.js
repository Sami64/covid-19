const covid19ImpactEstimator = (data) => {
  const input = data;
  // Challenge 1
  const factor = () => {
    let mulFact;
    switch (input.periodType) {
      case 'days':
        mulFact = Math.trunc(input.timeToElapse / 3);
        break;
      case 'weeks':
        mulFact = Math.trunc((input.timeToElapse * 7) / 3);
        break;
      case 'months':
        mulFact = Math.trunc((input.timeToElapse * 30) / 3);
        break;
      default:
        break;
    }
    return mulFact;
  };
  const factMulti = (Math.trunc(2 ** factor()));

  // Challenge 3
  const pCal = () => {
    let dWM;
    switch (input.periodType) {
      case 'days':
        dWM = input.timeToElapse;
        break;
      case 'weeks':
        dWM = input.timeToElapse * 7;
        break;
      case 'months':
        dWM = input.timeToElapse * 30;
        break;
      default:
        break;
    }
    return dWM;
  };

  const avgDIncome = input.region.avgDailyIncomeInUSD;
  const avgPIncome = input.region.avgDailyIncomePopulation;

  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: (input.reportedCases * 10) * factMulti,
      severeCasesByRequestedTime: 0.15 * ((input.reportedCases * 10) * factMulti),
      hospitalBedsByRequestedTime: Math.trunc(0.35 * input.totalHospitalBeds),
      casesForICUByRequestedTime: 0.05 * ((input.reportedCases * 10) * factMulti),
      casesForVentilatorsByRequestedTime: 0.02 * ((input.reportedCases * 10) * factMulti),
      dollarsInFlight: (((input.reportedCases * 10) * factMulti) * avgPIncome) * avgDIncome * pCal()
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: (input.reportedCases * 50) * factMulti,
      severeCasesByRequestedTime: 0.15 * ((input.reportedCases * 50) * factMulti),
      hospitalBedsByRequestedTime: Math.trunc(0.35 * input.totalHospitalBeds),
      casesForICUByRequestedTime: 0.05 * ((input.reportedCases * 50) * factMulti),
      casesForVentilatorsByRequestedTime: 0.02 * ((input.reportedCases * 50) * factMulti),
      dollarsInFlight: (((input.reportedCases * 50) * factMulti) * avgPIncome) * avgDIncome * pCal()
    }
  };
};

export default covid19ImpactEstimator;
