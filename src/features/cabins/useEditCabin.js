import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin as createOrEditCabinApi } from "../../services/apiCabins.js";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) =>
      createOrEditCabinApi(newCabinData, id),
    onSuccess: (data) => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: "cabins" });
      // reset(data);
      // reset(getValues());
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEditing, editCabin };
}
