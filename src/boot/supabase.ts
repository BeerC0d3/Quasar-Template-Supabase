import { reactive, ref } from 'vue';
import { createClient } from '@supabase/supabase-js';
import useAuthUser from 'src/auth/composables/userAuth';

const supabaseUrl: string | undefined = process.env.SUPABASE_URL!;
const supabaseKey: string | undefined = process.env.SUPABASE_KEY!;
const supabase = createClient<any>(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user, userInfoLogged } = useAuthUser();

  // console.log(session?.user.user_metadata);
  userInfoLogged.name = session?.user.user_metadata.name;
  userInfoLogged.email = session?.user.user_metadata.email;
  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
