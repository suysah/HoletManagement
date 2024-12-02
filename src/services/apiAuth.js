import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullname }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

export async function getCurrentSession() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Logout was unsucessful");
  }
}

export async function updateCurrentUser({ password, fullname, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };
  // console.log("data", data);
  console.log("fullname", fullname);

  //update teh passwird or fullname both cant be updated at the same time
  const { data, error } = await supabase.auth.updateUser(updateData);
  console.log("updateData", updateData);

  if (error) {
    throw new Error(`Failed to update user details: ${error.message}`);
  }

  if (!avatar) return data;

  //update the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(`Failed to upload avatar: ${uploadError.message}`);
  }

  //update avatar in user
  const { data: updatedUser, error: avatarUpdateError } =
    supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarUpdateError) {
    throw new Error(
      `Failed to update avatar URL: ${avatarUpdateError.message}`
    );
  }
  return updatedUser;
}
