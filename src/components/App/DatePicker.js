import 'date-fns';
import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(null);

  const getYYYYMM = (date)=>{
    date=(date==null)?new Date():date;
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : ('0' + month);
    return (year+month)
  }

  const handleDateChange = date => {
    setSelectedDate(date);
    props.setPeriod(getYYYYMM(date))
    //console.log(selectedDate)
  };

  useEffect(() => {
    //handleDateChange(selectedDate)
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Period"
          format="yyyy/MM"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}