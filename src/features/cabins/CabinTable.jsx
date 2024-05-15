import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

// v1

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // for filter
  const filteredValue = searchParams.get('discount') || 'all';

  let filteredData;

  switch (filteredValue) {
    case 'all':
      filteredData = cabins;
      break;
    case 'no-discount':
      filteredData = cabins.filter((cab) => cab.discount === 0);
      break;
    case 'with-discount':
      filteredData = cabins.filter((cab) => cab.discount > 0);
      break;

    default:
      break;
  }

  // sort

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';

  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredData.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (!cabins.length) return <Empty resourceName="cabins" />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row" as="header">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          renderData={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
