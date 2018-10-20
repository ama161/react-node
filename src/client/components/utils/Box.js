import React from 'react';

const Box = ({children, className, type, typeIcon, selected}) => {
    // let classNames = "box " + (className) ? className : '';
    let classNameType = (type === 'brown') ? 'box-brown' : (type === 'white') ? 'box-white' : 'box-blue';
    return(
        <div className = {type === "none" ? "" : "box " + classNameType + " " + selected}>
            {typeIcon 
                ? <p className={"icon " + typeIcon}></p>    
                : null
            }        
            {children}
        </div>
    )
}

export default Box;