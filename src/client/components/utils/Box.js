import React from 'react';

const Box = ({children, className, type, typeIcon}) => {
    // let classNames = "box " + (className) ? className : '';
    let classNameType = (type === 'brown') ? 'box-brown' : (type === 'white') ? 'box-white' : 'box-blue';
    return(
        <div className = {"box " + classNameType}>
            {typeIcon 
                ? <p className={"icon " + typeIcon}></p>    
                : null
            }        
            {children}
        </div>
    )
}

export default Box;