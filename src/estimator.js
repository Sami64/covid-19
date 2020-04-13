const covid19ImpactEstimator = (data) => {

  // Challenge 1
  const factor = () => {
    let mulFact;
    switch (data.periodType) {
      case 'days':
        mulFact = data.timeToElapse / 3;
        break;
      case 'weeks':
        mulFact = (data.timeToElapse * 7) / 3;
        break;
      case 'months':
        mulFact = (data.timeToElapse * 30) / 3;
        break;
      default:
        break;
    }
    return mulFact;
  };

  return {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: (data.reportedCases * 10) * (2 ** factor())
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: (data.reportedCases * 50) * (2 ** factor())
    }
  };
};

export default covid19ImpactEstimator;
