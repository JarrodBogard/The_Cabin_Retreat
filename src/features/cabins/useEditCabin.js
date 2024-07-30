import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin as createOrEditCabinAPI } from "../../services/apiCabins.js";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) =>
      createOrEditCabinAPI(newCabinData, id),
    onSuccess: (data) => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: "cabins" });
      // reset(data);
      // reset(getValues());
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEditing, editCabin };
}
