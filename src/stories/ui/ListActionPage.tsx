import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import { containerClasses } from '@mui/material';

export default ({heading, list, action: Action}) => {

  console.log({list});

  return (
      <Box sx={{ flexDirection: 'column', height: '100%', display: 'flex' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection:"column", overflow: 'hidden', overflowY: 'auto' }}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {heading}
              </ListSubheader>
            }
          >
            <ListItemButton>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <DraftsIcon />
                    </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItemButton>
            {list.map((peer, index ) => (
                <ListItemButton key={index}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary={peer.roomId ?? peer.id } />
                </ListItemButton>
            ))}
          </List>
        </Box>
        <Box>
          <Action />
        </Box>
      </Box>
  );
}
