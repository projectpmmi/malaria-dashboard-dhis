import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Indicators from '../data/Indicators.json'
import Group from '../ManageIndicator/Group'
import Indicator from '../ManageIndicator/Indicator'



const SelectIndicators = () => {
    const [choix, setChoix] = useState(false);
    const [codeGP, setCodeGP] = useState([]);

    const handleSelect = (e, value) => {
        setChoix(true);
        if(value!=null)setCodeGP(value.code)
      };

      if(choix===false){
        return ( 
            <Group handleSelect={handleSelect} />
        )
      }else{
        return (
            <> 
            {console.log("==============codeGP=============== : "+codeGP)}
                <Indicator codeGP={codeGP} />
            </>
        )
      }
    
}
 
export default SelectIndicators;