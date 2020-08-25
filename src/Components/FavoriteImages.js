import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addFavorite } from '../Redux/Actions/app.actions';
import Notification from '../Common/NotificationMess';

const DEFAULT_ITEM = 8;
const mess = "Remove Image Favorite Sucessfully";

const FavoriteImages = () => {
    const dispatch = useDispatch();
    const { dataImgFavorites } = useSelector(state => state.libImage);

    const [limitItems, setLimitItems] = useState(DEFAULT_ITEM);
    const [disableBtn, setDisableBtn] = useState(false);
    const [open, setOpen] = useState(false);

    const loadMore = () => {
        const newValue = limitItems + 8;
        setLimitItems(newValue);
        if (newValue > dataImgFavorites.length) {
            setDisableBtn(true);
        }
    }

    useEffect(()=> {
        if (dataImgFavorites.length === 0 && localStorage.getItem('favorite_data') != null) {
            let localFavoriteData = JSON.parse(localStorage.getItem('favorite_data'));
            if (localFavoriteData.length) {
                dispatch(addFavorite(localFavoriteData));
            }
        }
    }, [dataImgFavorites])

    const handleUnFavorite = (index) => {
        setOpen(true);
        dataImgFavorites.splice(index, 1);
        dispatch(addFavorite(dataImgFavorites));
        localStorage.setItem('favorite_data', JSON.stringify(dataImgFavorites));
    }

    return (
        <div className="app__search">
            <Notification {...{open, setOpen, mess}}/>
            <div className="app__favorite-result">
                <Grid container spacing={2}>
                    {
                        dataImgFavorites.slice(0, limitItems).map((item, index) => 
                            <Grid item xs={3} key={index} className="app__grid-item">
                                <div className="app__img-item">
                                    <img src={item} alt="image" width="100%" height="200"/>
                                    <FavoriteIcon className="icon-favorite-like" onClick={() => handleUnFavorite(index)}/>
                                </div>
                            </Grid>
                        )
                    }
                </Grid>
                {
                    dataImgFavorites.length > DEFAULT_ITEM ?
                        <Button variant='outlined' size='small' color='primary' className="btn_loadmore"
                            startIcon={<ExpandMore/>}
                            disabled={disableBtn === true}
                            onClick={loadMore}>
                            Load more
                        </Button>
                    : dataImgFavorites.length === 0 ? <span><i>No items</i></span> : ''
                }
            </div>
        </div>
    )
}

export default FavoriteImages;
