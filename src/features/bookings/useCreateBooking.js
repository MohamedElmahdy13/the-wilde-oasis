import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking as createBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    mutationKey: ['bookings'],
    onSuccess: (data) => {
      toast.success(`Your booking has created ${data[0].id}`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  return { createBooking, isCreating };
}
