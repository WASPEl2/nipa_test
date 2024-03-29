import React from 'react';

const ListWithIndentation = ({ items }) => {
  return items.split(/[\n]/).map((item, key) => {
    const trimmedItem = item.trim();
    if (trimmedItem === "") return null;


    const leadingSpaces = item.length - item.trimStart().length;

    const indentSize = leadingSpaces > 1 ? leadingSpaces * 2 : 0; // Assuming each space is equivalent to 4px indentation.

    return (
      <div key={key} >
        <p className={`ml-${indentSize}`}>
          {trimmedItem}
          <br />
        </p>
      </div>
    );
  });
};

export default ListWithIndentation;
