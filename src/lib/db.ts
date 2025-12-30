import { supabase } from "./supabase";
import { Inquiry } from "./types";

export async function getInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    throw error;
  }

  // Supabase 컬럼명을 프론트엔드 타입에 맞게 변환
  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    inquiry: row.inquiry,
    isRead: row.is_read,
    createdAt: row.created_at,
  }));
}

export async function saveInquiry(
  inquiry: Omit<Inquiry, "id" | "createdAt" | "isRead">
): Promise<Inquiry> {
  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      name: inquiry.name,
      phone: inquiry.phone,
      inquiry: inquiry.inquiry,
      is_read: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving inquiry:", error);
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    phone: data.phone,
    inquiry: data.inquiry,
    isRead: data.is_read,
    createdAt: data.created_at,
  };
}

export async function markAsRead(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("inquiries")
    .update({ is_read: true })
    .eq("id", id);

  if (error) {
    console.error("Error marking as read:", error);
    return false;
  }

  return true;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const { error } = await supabase.from("inquiries").delete().eq("id", id);

  if (error) {
    console.error("Error deleting inquiry:", error);
    return false;
  }

  return true;
}
