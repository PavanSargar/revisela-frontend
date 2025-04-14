import React from "react";

interface Props extends React.PropsWithChildren {}

const Layout = ({ children }: Props) => {
  return (
    <div className="p-6 ml-64 mt-16">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default Layout;
