import React from 'react';

const skills = [
  {
    skillCategory: "bread",
    skillName: "white Bread"
  },
  {
    skillCategory: "bread",
    skillName: "red Bread"
  },
  {
    skillCategory: "souce",
    skillName: "tomato souce"
  },
  {
    skillCategory: "souce",
    skillName: "onion souce"
  }
];

const SkillsList = () => {
  // Grouping skills by category
  const categorizedSkills = skills.reduce((acc, skill) => {
    const { skillCategory, skillName } = skill;
    if (!acc[skillCategory]) {
      acc[skillCategory] = [];
    }
    acc[skillCategory].push(skillName);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(categorizedSkills).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {categorizedSkills[category].map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SkillsList;
