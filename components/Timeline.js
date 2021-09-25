import React from "react";

export const Timeline = ({ children }) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    const direction = index % 2 === 0 ? "r" : "l";

    if (React.isValidElement(child)) {
      return React.cloneElement(child, { direction });
    }
    return child;
  });

  return <ul className="timeline">{childrenWithProps}</ul>;
};
