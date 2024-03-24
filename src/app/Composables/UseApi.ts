import useSupabase from 'src/boot/supabase';

export default function useApi() {
  const { supabase } = useSupabase();

  const CollectionTable = async (schema: string, table: string) => {
    const { data, error } = await supabase.schema(schema).from(table).select();
    if (error) throw error;

    return data;
  };

  return { CollectionTable };
}
