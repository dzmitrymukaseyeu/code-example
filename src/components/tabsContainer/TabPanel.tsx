import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className: string;
}

const defaultProps = {
  children: () => <></>,
};

const TabPanel = (props: TabPanelProps) => {
  const {
    className, children, value, index, ...other
  } = props;

  return (
    <div
      className={className}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
};

export default TabPanel;

TabPanel.defaultProps = defaultProps;