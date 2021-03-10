import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useSelector} from 'react-redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const loadingElementStyle = { height: '100%' };
const containerElementStyle = { height: '280px', width: '280px' };
const mapElementStyle = { height: '100%' };


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();
  const checkin = useSelector(state => state.checkinDate);
  const checkout = useSelector(state => state.checkoutDate);
  const address = useSelector(state => state.address);
  const id = useSelector(state => state.id)
 
  const defaultCenter = id;

  const defaultOptions = { scrollwheel: false };

  const RegularMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={ defaultCenter }
        defaultOptions={ defaultOptions }
      >
        <Marker position={ defaultCenter } />
      </GoogleMap>
    ))
  );

  return (
    <React.Fragment>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{checkin.toLocaleString()}</Typography>
          <Typography gutterBottom>{checkout.toLocaleString()}</Typography>
        </Grid>
        <Grid item container direction="row" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Typography gutterBottom>{address.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <RegularMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpJL1Xw6hgwZ9Qopjrjqgf1KirBnI8nLM"
                loadingElement={<div  style={ loadingElementStyle } />}
                containerElement={<div style={ containerElementStyle } />}
                mapElement={<div id='map' style={ mapElementStyle } />}
              />
            </Grid>
          </Grid> 
        </Grid>
    </React.Fragment>
  );
}

