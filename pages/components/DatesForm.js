import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import addHours from 'date-fns/addHours';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {useSelector, useDispatch} from 'react-redux';

export default function DatesForm() {
  const checkin = useSelector(state => state.checkinDate)
  const checkout = useSelector(state => state.checkoutDate)
  const dispatch = useDispatch();
  
  let date = addHours(checkin, 6);
  
  let result = eachDayOfInterval({
    start: checkin,
    end: new Date(2022, 7, 10)
  })
  

  const setCheckin = (data) => {
    return dispatch({
      type: 'SET_CHECKIN',
      checkinDate: data
    })
  }

  const setCheckout = (data) => {
    return dispatch({
      type: 'SET_CHECKOUT',
      checkoutDate: data
    })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dates
      </Typography>
      <Grid container spacing={6} >
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={checkin}
                onChange={setCheckin}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                minDate={checkin}
                maxDate={result.pop()}
                value={checkout}
                onChange={setCheckout}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={checkin}
                onChange={setCheckin}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={date}
                onChange={setCheckout}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}