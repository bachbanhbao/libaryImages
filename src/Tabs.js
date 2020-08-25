import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Paper, Tabs, Tab, Container, Box } from '@material-ui/core';
import { Favorite, Search } from '@material-ui/icons';
import SearchResult from './SearchResult';
import FavoriteImages from './FavoriteImages';
import { addFavorite } from './app.actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Container>
                <Box>
                    {children}
                </Box>
            </Container>
        )}
    </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [value, setValue] = React.useState(0);
    const { dataImgFavorites } = useSelector(state => state.libImage);

    useEffect(()=> {
        if (dataImgFavorites.length === 0) {
            const localFavoriteData = localStorage.getItem('favorite_data') != null ? localStorage.getItem('favorite_data') : '[]';
            // localFavoriteData = JSON.parse(localFavoriteData);
            // console.log(localFavoriteData)
            // localFavoriteData.length > 0 ? dispatch(addFavorite([])) : '';
        }
    }, [dataImgFavorites])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <div className={classes.root}>
        <Paper square className={classes.root}>
            <Tabs 
                value={value} 
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="primary"
                >
                <Tab icon={<Search />} label="SEARCH" {...a11yProps(0)}/>
                <Tab icon={<Favorite />} label={"FAVORITES (" + dataImgFavorites.length + ")"} {...a11yProps(1)} />
            </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
            <SearchResult/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <FavoriteImages/>
        </TabPanel>
    </div>
  );
}
