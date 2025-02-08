import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`px-4 sm:px-6 md:px-8 lg:px-10 xl:px-32 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
