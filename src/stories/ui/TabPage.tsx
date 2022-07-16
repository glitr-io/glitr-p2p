import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { height } from "@mui/system";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <Box
        sx={{ height: '100%' }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (children)}
      </Box>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default ({ tabs}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // render tabs based on material ui tabs
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.map((tab, index) => (
                        <Tab label={tab.name} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              {tabs.map((tab, index) => (
                  <TabPanel value={value} index={index}>
                      {tab.content}
                  </TabPanel>
              ))}
            </Box>
        </Box>
    );
}