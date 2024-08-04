import supabase from './supabase';

export async function getGuests() {
  const { data, error } = await supabase
    .from('guests')
    .select('id,email,fullName');

  if (error) throw new Error('Guests could been loaded');

  return data;
}
