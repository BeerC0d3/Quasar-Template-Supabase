import useSupabase from 'src/boot/supabase';
import { useCommonStore } from 'src/stores/all';

export default function useApi() {
  const { supabase } = useSupabase();
  const $commonStore = useCommonStore();

  const TableToList = async (schema: string, table: string) => {
    const { data, error } = await supabase.schema(schema).from(table).select();
    if (error) throw error;
    $commonStore.Remove_Request();

    return data;
  };
  const insertData = async (schema: string, table: string, data: any) => {
    const { error } = await supabase
      .schema(schema)
      .from(table)
      .insert([{ ...data }]);
    if (error) throw error;

    $commonStore.Remove_Request();
  };

  const updateData = async (schema: string, table: string, dataObject: any) => {
    const { data, error } = await supabase
      .schema(schema)
      .from(table)
      .update({ ...dataObject })
      .match({ id: dataObject.id });
    if (error) throw error;
    $commonStore.Remove_Request();
    return data;
  };

  return { TableToList, insertData, updateData };
}
