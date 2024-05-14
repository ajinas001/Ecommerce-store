import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDropdown } from '../../Redux/SidebarSlice';

const MyComponent = () => {
  const isDropdownOpen = useSelector(state => state.sidebar.isDropdownOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDropdown());
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle Dropdown</button>
      <p>Dropdown is {isDropdownOpen ? 'open' : 'closed'}</p>
    </div>
  );
};

export default MyComponent;
