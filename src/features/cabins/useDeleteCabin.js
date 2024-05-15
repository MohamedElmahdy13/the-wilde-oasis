import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: (id) => deleteCapin(id),
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin is successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.err(err.message),
  });

  return { isDeleting, deleteCabin };
}
