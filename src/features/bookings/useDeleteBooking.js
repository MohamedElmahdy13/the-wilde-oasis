import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingHandler } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingHandler,
    onSuccess: (id) => {
      toast.success(`Booking #${id} is successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (err) => toast.err(err.message),
  });

  return { isDeleting, deleteBooking };
}
