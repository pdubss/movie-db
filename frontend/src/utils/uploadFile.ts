import { supabase } from "@/supabaseClient";

async function uploadFile(userId: string, file: File) {
  const filePath = `${userId}/${Date.now()}${file.name}`;
  try {
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicURL = publicData.publicUrl;

    const { data: profileData, error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicURL })
      .eq("user_id", userId)
      .select()
      .single();

    if (updateError) throw updateError;

    return profileData;
  } catch (error) {
    console.error(error);
  }
}

export default uploadFile;
