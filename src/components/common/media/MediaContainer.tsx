import { makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      className={className}
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 10,
  },
  content: {
    padding: 10,
  },
}));

export default function MediaContainer({ ...args }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.card}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='tabs example'
        {...args}
      >
        <Tab label='Facebook' {...a11yProps(0)} />
        <Tab label='Twitter' {...a11yProps(1)} />
        <Tab label='WhatsApp' {...a11yProps(2)} />
      </Tabs>
      <TabPanel className={classes.content} value={value} index={0}>
        FaceBook Cotent
      </TabPanel>
      <TabPanel className={classes.content} value={value} index={1}>
        Twitter Content
      </TabPanel>
      <TabPanel className={classes.content} value={value} index={2}>
        WhatsApp Content
      </TabPanel>
    </div>
  );
}
