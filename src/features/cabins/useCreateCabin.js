import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin as createOrEditCabinApi } from "../../services/apiCabins.js";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createOrEditCabinApi,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: "cabins" });
      // reset();
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createCabin };
}
