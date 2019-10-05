import React from 'react';

const Form = ({ onInputChange, onSearch }) => {
    return(
        <form  onSubmit={onSearch}>
            <input style={inputStyle} placeholder='Search case to Fund' type='text' onChange={onInputChange} />
            <button style = {searchStyle}><i className="fa fa-search"></i></button>
        </form>
    )
}

const searchStyle = {
    borderRadius : '0 16px 16px 0',
    backgroundColor : '#d8241c',
    minWidth : '40px',
    padding : '12px'
}
const inputStyle = {
    padding : '12px',
    borderRadius : '16px 0 0 16px',
    outline : 'none'
}

export default Form;