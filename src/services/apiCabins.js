import supabase, { supabaseUrl } from "./supabase";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Corrected object spelling in the URL
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // Upload the image file with the correct imageName

  if (imagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there's an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id); // Accessing first item in data array
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

// export async function updateCabin(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .update({ other_column: "otherValue" })
//     .eq("some_column", "someValue")
//     .select();

//   if (error) {
//     console.log(error);
//     throw new Error("Cabin could not be Updated");
//   }

//   console.log("data", data);

//   return data;
// }
