import { ref } from 'vue';
import useSupabase from 'boot/supabase';
import { IUserAuth } from 'src/auth/Models/IUserAuth';

const user = ref<any>(null);

export default function useUserAuth() {
  const { supabase } = useSupabase();

  const userSignIn = async (modelUserAuth: IUserAuth) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: modelUserAuth.email,
      password: modelUserAuth.password,
    });

    if (error) throw error;

    user.value = data;
    return user;
  };

  // const userRegister = async ({ email, password, ...meta }) => {
  //   const { data, error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: 'https://example.com/welcome',
  //     },
  //   });

  //   if (error) throw error;
  //   return user;
  // };

  return { user, userSignIn };
}
