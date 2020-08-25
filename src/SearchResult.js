import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField , makeStyles, FormControl, Button } from '@material-ui/core';
import { Search, ExpandMore } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { searchImages, addFavorite } from './app.actions';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
    },
}))

const DEFAULT_ITEM = 8;

const SearchResult = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { lstDataSearch } = useSelector(state => state.libImage);
    const { dataImgFavorites } = useSelector(state => state.libImage);

    const [keyword, setKeyWord] = useState('');
    const [lstImgFilter, setLstImgFilter] = useState([]);
    
    const [limitItems, setLimitItems] = useState(DEFAULT_ITEM);
    const [disableBtn, setDisableBtn] = useState(false);

    console.log(dataImgFavorites);

    useEffect(()=> {
        if (lstDataSearch.length) {
            const tmp = lstDataSearch.map(item => {
                const obj = item.images.original.url;
                return obj;
            });
            setLstImgFilter(tmp);
            localStorage.setItem('filter_data', JSON.stringify(tmp));
        }
    }, [lstDataSearch]);
    
    const handleChangeTextboxSearch = () => {
        dispatch(searchImages(keyword));
    }

    const loadMore = () => {
        const newValue = limitItems + 8;
        setLimitItems(newValue);
        if (newValue > lstImgFilter.length) {
            setDisableBtn(true);
        }
    }

    const handleAddFavorite = (index) => {
        const item = lstImgFilter[index];
        lstImgFilter.splice(index, 1);
        setLstImgFilter(lstImgFilter);
        dispatch(addFavorite([...dataImgFavorites, item]));
        localStorage.setItem('favorite_data', JSON.stringify([...dataImgFavorites, item]));
        localStorage.setItem('filter_data', lstImgFilter);
    }

    return (
        <div className="app__search">
            <div className="app__search-textbox">
                <Grid container spacing={2}>
                    <Grid item xs>
                        <FormControl className={`${classes.formControl} w-100`}>
                            <TextField
                                value={keyword}
                                fullWidth
                                onChange={(e) => setKeyWord(e.target.value)}
                                label="Start searching for images"
                            >
                            </TextField>
                            <Button variant='outlined' size='small' color='default'
                                startIcon={<Search/>}
                                onClick={handleChangeTextboxSearch}>
                                Search
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <div className="app__search-result">
                <Grid container spacing={2}>
                    {
                        lstImgFilter.slice(0, limitItems).map((item, index) => 
                            <Grid item xs={3} key={index} className="app__grid-item">
                                <div className="app__img-item">
                                    <img src={item} alt="image" width="100%" height="200"/>
                                    <FavoriteIcon className="icon-favorite-unlike" onClick={() => handleAddFavorite(index)}/>
                                </div>
                            </Grid>
                        )
                    }
                </Grid>
                {
                    lstImgFilter.length > DEFAULT_ITEM ?
                        <Button variant='outlined' size='small' color='primary' className="btn_loadmore"
                            startIcon={<ExpandMore/>}
                            disabled={disableBtn === true}
                            onClick={loadMore}>
                            Load more
                        </Button>
                    : ''
                }
            </div>
        </div>
    )
}

export default SearchResult;
