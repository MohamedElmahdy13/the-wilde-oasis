import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from './../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabins } from './../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from './../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 1025px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  @media (max-width: 577px) {
    grid-template-columns: 1fr;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();

  const { stays, confirmedStays, isLoadingStays, numDays } = useRecentStays();

  const { cabins, isLoading: isLoadingCabins } = useCabins();
  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
