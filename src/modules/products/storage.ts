import { supabase } from "@/src/lib/supabase";

type UploadResult = {
  path: string;
  publicUrl: string;
};

export async function uploadProductFile(
  file: File,
  path: string
): Promise<UploadResult> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("product-media")
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data } = supabase.storage
    .from("product-media")
    .getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}
