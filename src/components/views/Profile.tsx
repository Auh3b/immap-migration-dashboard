import {
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ChangeEvent, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'store/appSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const handleTabChange = (_e: ChangeEvent<{}>, value: number) => {
    setValue(value);
  };
  return (
    <Grid container wrap={'nowrap'} className={classes.root}>
      <ProfileMenu value={value} onTabChange={handleTabChange} />
      <Divider flexItem orientation={'vertical'} />
      <ProfileContent value={value} views={{ 0: <UserDetails /> }} />
    </Grid>
  );
}

interface ProfileMenuProps {
  value: number;
  onTabChange: (e: ChangeEvent<{}>, value: number) => void;
}

function ProfileMenu({ value, onTabChange }: ProfileMenuProps) {
  return (
    <Grid item lg={2}>
      <Tabs
        indicatorColor='primary'
        textColor='primary'
        orientation={'vertical'}
        value={value}
        onChange={onTabChange}
      >
        <Tab label='Details' />
        <Tab label='Setting' />
      </Tabs>
    </Grid>
  );
}

interface ProfileContentProps {
  value: number;
  views: Record<number, ReactNode>;
}

function ProfileContent({ value, views }: ProfileContentProps) {
  return (
    <Grid item style={{ flexGrow: 1, padding: '0 16px' }}>
      {views[value] || <>No details yet</>}
    </Grid>
  );
}

function UserDetails() {
  const user = useSelector((state) => getUser(state));
  return (
    <Grid container>
      <Grid item style={{ paddingRight: '16px' }}>
        <img src={user?.picture} width={100} height={100} alt='profile' />
      </Grid>
      <Divider flexItem orientation={'vertical'} />
      <Grid item style={{ paddingLeft: '16px' }}>
        <Typography>Name: {user?.name}</Typography>
        <Typography>Email: {user?.name}</Typography>
      </Grid>
    </Grid>
  );
}
