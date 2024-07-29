import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if a storage error occurs when uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);

    throw new Error(
      "Cabin was not created because the cabin image could not be uploaded",
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

/* Notes on image upload to Supabase
If a bad request upload error is received be sure to allow insert operations on storage.object and omit any bucket policies.

RLS policy permissions required: buckets, table permissions: none, objects table permissions: only 'insert' when uploading new files and 'select', 'insert', and 'update' when upserting files.

For React Native, using either Blob, File or FormData does not work as intended. Upload files using ArrayBuffer from base64 file data instead.
*/
