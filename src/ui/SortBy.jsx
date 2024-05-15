import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  function handleChange(e) {
    const { value } = e.target;
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={sortBy}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
