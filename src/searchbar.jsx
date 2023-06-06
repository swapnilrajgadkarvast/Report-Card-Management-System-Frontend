import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SearchBar_Report = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue('');
  };

  return (
    <div className="relative flex items-center justify-center h-30 bg-slate-50">
    <div className="relative w-64 m-4">
      <div className="flex items-center rounded-full border border-gray-300 bg-white">
        <div className="pl-3 pr-1">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search"
          className="py-2 pr-2 w-full rounded-r-full focus:outline-none"
        />
        {searchValue && (
          <button
            onClick={clearSearchValue}
            className="px-2 focus:outline-none text-gray-500"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>

    </div>
    </div>
    
  );
};
export default SearchBar_Report;