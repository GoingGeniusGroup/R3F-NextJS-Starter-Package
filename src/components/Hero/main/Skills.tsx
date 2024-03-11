'use client'
import { useState } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([
    { name: 'HTML', percentage: 80 },
    { name: 'CSS', percentage: 75 },
    { name: 'JavaScript', percentage: 90 },
    // Add more skills as needed
  ]);

  const handleSkillNameChange = (index, newName) => {
    setSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index].name = newName;
      return updatedSkills;
    });
  };

  const handleSliderChange = (index, newValue) => {
    setSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index].percentage = newValue;
      return updatedSkills;
    });
  };

  const handleAddSkill = () => {
    setSkills(prevSkills => [
      ...prevSkills,
      { name: '', percentage: 0 } // Add a new skill with empty name and 0 percentage
    ]);
  };

  return (
    <div>
      <h2>Skills</h2>
      {skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            value={skill.name}
            onChange={(e) => handleSkillNameChange(index, e.target.value)}
            placeholder="Skill Name"
          />
          <p>{skill.name}: {skill.percentage}%</p>
          <input
            type="range"
            min="0"
            max="100"
            value={skill.percentage}
            onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
          />
        </div>
      ))}
      <button onClick={handleAddSkill}>+ Add Skill</button>
    </div>
  );
};

export default Skills;