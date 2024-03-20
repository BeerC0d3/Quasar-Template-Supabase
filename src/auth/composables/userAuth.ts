import { reactive, ref } from 'vue';
import useSupabase from 'boot/supabase';
import { IUserAuth, IUserInfoLogged } from 'src/auth/Models/IUserAuth';

const user = ref<any>(null);
const userInfoLogged = reactive<IUserInfoLogged>({
  name: '',
  email: '',
});

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
  const isLoggedIn = (): boolean => {
    return !!user.value;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { user, userSignIn, userSignUp, isLoggedIn, logout, userInfoLogged };
}
