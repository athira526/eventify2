export const categorizedSkills = (skills) => {
    return skills.reduce((acc, skill) => {
      const { category } = skill;
      if (!acc[category.name]) {
        acc[category.name] = [];
      }
      acc[category.name].push(skill);
      return acc;
    }, {});
  };