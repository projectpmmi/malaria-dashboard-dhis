import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Indicators from '../data/Indicators.json'

const Group = (props) => {
    const handleSelect= (e, value) => {
       props.handleSelect(e, value)
      };

    return ( 
        <Autocomplete
                id="combo-box-demo"
                options={Indicators.groups}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={handleSelect}
                renderInput={(params) => <TextField {...params} label="Goups" variant="outlined" />}
        />
     );
}
 
export default Group;