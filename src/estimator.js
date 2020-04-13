const covid19ImpactEstimator = (data) => {
  const input = data;
  // Challenge 1
  const factor = () => {
    let mulFact;
    switch (input.periodType) {
      case 'days':
        mulFact = input.timeToElapse / 3;
        break;
      case 'weeks':
        mulFact = (input.timeToElapse * 7) / 3;
        break;
      case 'months':
        mulFact = (input.timeToElapse * 30) / 3;
        break;
      default:
        break;
    }
    return mulFact;
  };

  // Challenge 3
  const periodCalc = () => {
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

  let avgDIncome = input.region.avgDailyIncomeInUSD;
  let avgPIncome = input.region.avgDailyIncomePopulation;

  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: (input.reportedCases * 10) * (2 ** factor()),
      severeCasesRequestedByTime: 0.15 * ((input.reportedCases * 10) * (2 ** factor())),
      hospitalBedsRequestedByTime: Math.trunc(0.35 * input.totalHospitalBeds),
      casesForICUByRequestedTime: 0.05 * ((input.reportedCases * 10) * (2 ** factor())),
      casesForVentilatorsByRequestedTime: 0.02 * ((input.reportedCases * 10) * (2 ** factor())),
      dollarsInFlight: (((input.reportedCases * 10) * (2 ** factor())) * avgPIncome) * avgDIncome * periodCalc()
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: (input.reportedCases * 50) * (2 ** factor()),
      severeCasesRequestedByTime: 0.15 * ((input.reportedCases * 50) * (2 ** factor())),
      hospitalBedsRequestedByTime: Math.trunc(0.35 * input.totalHospitalBeds),
      casesForICUByRequestedTime: 0.05 * ((input.reportedCases * 50) * (2 ** factor())),
      casesForVentilatorsByRequestedTime: 0.02 * ((input.reportedCases * 50) * (2 ** factor())),
      dollarsInFlight: (((input.reportedCases * 50) * (2 ** factor())) * avgPIncome) * avgDIncome * periodCalc()
    }
  };
};

export default covid19ImpactEstimator;
