import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'


const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        // Correctly accessing the input field value
        const filterValue = event.target.value;
      
        // Dispatch the action with the correct value
        dispatch(filterAction(filterValue));
      };
      
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input 
        type="text"
        name="filterValue"
        onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter