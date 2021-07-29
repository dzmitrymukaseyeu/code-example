import React, { useState } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import TabPanel from './TabPanel';
import useStyles from './Tabs.styles';

const accessibilityProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const TabsContainer = (props: {
  data: any[],
}) => {
  const classes = useStyles();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { data } = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {data.map((item, i) => (
            <Tab
              key={item.name}
              label={item.name}
              disabled={item.disabled || false}
              {...accessibilityProps(i)}
            />
          ))}
        </Tabs>
      </AppBar>
      {data.map((item, i) => (
        <TabPanel
          className={classes.tabContent}
          key={item.name}
          value={selectedTabIndex}
          index={i}
        >
          {item.component}
        </TabPanel>
      ))}
    </div>
  );
};

export default TabsContainer;