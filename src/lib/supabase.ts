import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Inquiry 테이블 타입 정의
export interface InquiryRow {
  id: string;
  name: string;
  phone: string;
  inquiry: string;
  is_read: boolean;
  created_at: string;
}
