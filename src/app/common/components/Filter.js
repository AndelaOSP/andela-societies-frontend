import React from 'react';
import PropTypes from 'prop-types';
import capitalize from '../../utils/capitalize';

const Filter = ({
  filterBy, handleClick, show, filterRef,
}) => (
  <div className='dropdown'>
    <div ref={filterRef} className={`dropdown-menu filter ${show ? 'show' : ''}`} aria-labelledby='dropdownMenuButton'>
      {filterBy.map((item, index) => (
        <div className='dropdown-item filter__option'>
          <input
            className='form-check-input'
            type='checkbox'
            value={item.name}
            id={item.name}
            onClick={handleClick(index)}
            checked={item.checked}
          />
          <div className='form-check-label filter__text' htmlFor={item.name} id={item.name}>
            {capitalize(item.name)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

Filter.propTypes = {
  names: PropTypes.array.isRequired,
};

export default Filter;
