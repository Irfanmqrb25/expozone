interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="px-2 py-3 md:px-8 lg:px-16 md:py-5">{children}</div>;
};

export default Container;
