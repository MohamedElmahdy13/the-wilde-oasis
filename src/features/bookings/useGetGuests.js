import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';

export function useGetGuests() {
  const { data: guests, isLoading:isLoading2 } = useQuery({
    queryFn: getGuests,
    queryKey: ['guests'],
  });

  return {
    guests,
    isLoading2,
  };
}
