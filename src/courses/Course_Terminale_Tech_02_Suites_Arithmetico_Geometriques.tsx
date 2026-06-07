import React from 'react';
import { CourseHeader, Section, InfoBlock } from '../components/SharedUI';

const Course: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader acronym="XX"  
        title="Terminale Tech 02 Suites Arithmetico Geometriques"
        />
      
      <Section title="Contenu en préparation" color="emerald">
        <p>Le contenu détaillé de ce cours sera bientôt disponible.</p>
      </Section>
    </div>
  );
};

export default Course;
