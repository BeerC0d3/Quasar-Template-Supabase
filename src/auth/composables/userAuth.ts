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

  const userSignUp = async (modelUserAuth: IUserAuth) => {
    const { data, error } = await supabase.auth.signUp({
      email: modelUserAuth.email,
      password: modelUserAuth.password,
      options: {
        data: {
          name: modelUserAuth.name,
        },
      },
    });

    if (error) throw error;

    user.value = data;
    return user;
  };
  return { user, userSignIn, userSignUp };
}
