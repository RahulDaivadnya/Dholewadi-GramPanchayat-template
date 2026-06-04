import { supabase } from "../config/supabase";
import { defaultSiteContent, defaultTrackStatusItems } from "../data/defaultContent";

const contentKeys = Object.keys(defaultSiteContent);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureSupabaseClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY values.");
  }
}

function mapContentRows(rows = []) {
  const merged = clone(defaultSiteContent);

  rows.forEach((row) => {
    if (row.key in merged && row.value !== null && row.value !== undefined) {
      merged[row.key] = row.value;
    }
  });

  return merged;
}

function mapTrackingRows(rows = []) {
  if (!rows.length) {
    return clone(defaultTrackStatusItems);
  }

  return rows.map((row) => ({
    id: row.id,
    mobile: row.mobile,
    service: row.service,
    status: row.status,
    remarks: row.remarks,
    fullName: row.full_name ?? "",
    email: row.email ?? "",
    address: row.address ?? "",
    referenceValue: row.reference_value ?? "",
    uploadedFiles: row.uploaded_files ?? {},
  }));
}

function normalizeTrackingRow(item) {
  return {
    id: item.id,
    mobile: item.mobile,
    service: item.service,
    status: item.status,
    remarks: item.remarks,
    full_name: item.fullName ?? "",
    email: item.email ?? "",
    address: item.address ?? "",
    reference_value: item.referenceValue ?? "",
    uploaded_files: item.uploadedFiles ?? {},
  };
}

export async function fetchSiteContent() {
  ensureSupabaseClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("key, value")
    .in("key", contentKeys);

  if (error) {
    throw error;
  }

  return mapContentRows(data);
}

export async function saveSiteContent(content) {
  ensureSupabaseClient();

  const rows = contentKeys.map((key) => ({
    key,
    value: content[key],
  }));

  const { error } = await supabase.from("site_content").upsert(rows, {
    onConflict: "key",
  });

  if (error) {
    throw error;
  }

  return clone(content);
}

export async function resetSiteContent() {
  await saveSiteContent(defaultSiteContent);
  return clone(defaultSiteContent);
}

export async function fetchTrackingItems() {
  ensureSupabaseClient();

  const { data, error } = await supabase
    .from("application_tracking")
    .select("id, mobile, service, status, remarks, full_name, email, address, reference_value, uploaded_files")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return mapTrackingRows(data);
}

export async function replaceTrackingItems(items) {
  ensureSupabaseClient();

  const { error: deleteError } = await supabase
    .from("application_tracking")
    .delete()
    .not("id", "is", null);

  if (deleteError) {
    throw deleteError;
  }

  const rows = items.map(normalizeTrackingRow);

  if (!rows.length) {
    return [];
  }

  const { data, error } = await supabase
    .from("application_tracking")
    .insert(rows)
    .select("id, mobile, service, status, remarks, full_name, email, address, reference_value, uploaded_files");

  if (error) {
    throw error;
  }

  return mapTrackingRows(data);
}

export async function resetTrackingItems() {
  const items = await replaceTrackingItems(defaultTrackStatusItems);
  return items;
}

export async function createTrackingApplication(application) {
  ensureSupabaseClient();

  const row = normalizeTrackingRow(application);

  const { data, error } = await supabase
    .from("application_tracking")
    .insert(row)
    .select("id, mobile, service, status, remarks, full_name, email, address, reference_value, uploaded_files")
    .single();

  if (error) {
    throw error;
  }

  return mapTrackingRows([data])[0];
}

export async function createContactMessage(message) {
  ensureSupabaseClient();

  const { error } = await supabase.from("contact_messages").insert({
    name: message.name,
    email: message.email,
    message: message.message,
  });

  if (error) {
    throw error;
  }
}
