import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
    .select();
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be delete');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1- create the cabin
  // creating

  let query = supabase.from('cabins');
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select();
  }

  // editing

  if (id) {
    // console.log(id);
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select();
  if (error) {
    // console.log(error);
    throw new Error('Cabin could not be created');
  }

  // 2. upload image

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. if there is storageError delete the cabin
  if (storageError) {
    // await deleteCapin(data.id);

    await supabase.from('cabins').delete().eq('id', newCabin.id);
    throw new Error(
      'Cabin image could not be uploaded and cabin was not created'
    );
  }
  return data;
}
