/*
// in helper.js
 
export const getImageNameFromUrl = (url) => url.split('/').pop();

Editing a Cabin

In CreateCabinForm.jsx



// get the image name
 
const currentImage = getImageNameFromUrl(editValues.image);
 
// pass this into our editCabin func inside our onSubmit func
 
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId, currentImage },
        { onSuccess: () => reset() },
      );
      return setShowForm((cur) => !cur);
    }
Now we need to update our useEditCabin hook and our api - createEditCabin

In useEditCabin

// make sure the image name is being passed along
 
mutationFn: ({ newCabinData, id, currentImage }) =>
      createEditCabin(newCabinData, id, currentImage),


In apiCabins / createEditCabin()

// accept the image name
 
export const createEditCabin = async (newCabin, id, currentImage) => {}
 
// at the end of the function, before return data and after the storage error check
// if the new image failed to upload, we don't want this to run
 
 
await supabase.storage.from('cabin-images').remove([currentImage])

Deleting a Cabin

Similar story here!

in CabinRow.jsx

// get the image name
 
const imageName = getImageNameFromUrl(image);
 
// in the onClick for the delete button:
// now pass the args in an object as it only accepts 1 argument
 
onClick={() => deleteCabin({ cabinId, imageName })}

in apiCabins / deleteCabin()

// accept and deconstruct 
 
export const deleteCabin = async ({ cabinId: id, imageName: image }) => {}
 
// At the end of the function, after checking for a cabin error
 
  const { error: imageError } = await supabase.storage
    .from('cabin-images')
    .remove([image]);
 
  if (imageError) {
    console.log(imageError);
    throw new Error('Cabin deleted, but unable to delete image');
  }
  */
