import React, { useEffect, useState, useReducer, useRef, useCallback } from 'react'


export const Search = ({ onSetSearch }) => {
  const inputRef = useRef(null)
  const [txtInput,setTxtInput] = useState('')
  
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  // handle the change of the input value
  const handleChange =((ev) => {
    ev.preventDefault()
    setTxtInput(ev.target.value)
  })
  
  // emits up the event for the main app in order to reach the store and search for new song list
  const onSubmitForm = (ev) => {
    ev.preventDefault()
    onSetSearch(txtInput)
    setTxtInput('')
    inputRef.current.value = '';
  }

  return (
    <form autoComplete='off' className="search-form">
      <label htmlFor=''>Search for Music</label>
      <div className="search-song">
        <input 
          ref={inputRef}
          type='text'
          placeholder='Search music'
          onChange={handleChange}
        />
        <button className="search" onClick={onSubmitForm}>Search</button>
      </div>
    </form>
  )
}
