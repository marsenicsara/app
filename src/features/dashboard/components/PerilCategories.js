import React from 'react';
import { PerilsCategory } from './PerilsCategory';

const PerilCategories = ({ perilCategories }) => (
  <React.Fragment>
    {perilCategories.map(({ title, description, perils, iconUrl }) => (
      <PerilsCategory
        title={title}
        description={description}
        perils={perils}
        iconUrl={iconUrl}
        key={title}
      />
    ))}
  </React.Fragment>
);

export { PerilCategories };
