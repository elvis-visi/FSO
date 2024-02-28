import { useState, forwardRef, useImperativeHandle } from 'react'
import {  Button } from 'react-bootstrap'
const Togglable = forwardRef ((props, refs) => {

//set the visibility of the child component
const [visible, setVisible] = useState(false)

//display styles
const hideWhenVisible = { display: visible ? 'none' : '' }
const showWhenVisible = { display: visible ? '' : 'none' }

const toggleVisibility = () => {
    setVisible(!visible)
  }

  //make toggleVisibility available outside this component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant="primary">
        cancel
        </Button>
      </div>

    </div>

  )

})



export default Togglable