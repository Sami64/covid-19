const covid19ImpactEstimator = (data) => {
  const input = data;

  // Challenge 1

  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50
    }
  };
};

export default covid19ImpactEstimator;
