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

  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: (input.reportedCases * 10) * (2 ** factor())
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: (input.reportedCases * 50) * (2 ** factor())
    }
  };
};

export default covid19ImpactEstimator;
