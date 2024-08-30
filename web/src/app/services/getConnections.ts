interface Address {
  city: string;
  state: string;
  street: string;
  country_code: string;
  post_code: string;
}

interface HolderInfo {
  names: string[];
  emails: string[];
  phone_numbers: string[];
  addresses: Address[];
}

interface LastStage {
  created_at: Date;
  id: string;
  interactive_fields_names?: string[] | null;
  interactive_html?: string | null;
  name: string;
  updated_at: Date;
}

interface LastAttempt {
  api_mode: string;
  api_version: string;
  automatic_fetch: boolean;
  user_present: boolean;
  daily_refresh: boolean;
  categorize: boolean;
  created_at: Date;
  customer_last_logged_at?: Date | null;
  custom_fields: Record<string, unknown>; // Dictionary-like object
  device_type: string;
  remote_ip: string;
  exclude_accounts: string[];
  fail_at?: Date | null;
  fail_error_class?: string | null;
  fail_message?: string | null;
  fetch_scopes: string[];
  finished: boolean;
  finished_recent: boolean;
  from_date?: Date | null;
  id: string;
  interactive: boolean;
  locale: string;
  partial: boolean;
  store_credentials: boolean;
  success_at?: Date | null;
  to_date?: Date | null;
  unduplication_strategy: string;
  updated_at: Date;
  show_consent_confirmation: boolean;
  consent_id: string;
  include_natures?: string[] | null;
  last_stage: LastStage;
}

export interface Connection {
  country_code: string;
  created_at: Date;
  customer_id: string;
  daily_refresh: boolean;
  id: string;
  secret: string;
  categorization: string;
  show_consent_confirmation: boolean;
  last_consent_id: string;
  last_attempt: LastAttempt;
  holder_info?: HolderInfo | null;
  last_success_at?: Date | null;
  next_refresh_possible_at?: Date | null;
  provider_id: string;
  provider_code: string;
  provider_name: string;
  status: "active" | "inactive" | "disabled";
  store_credentials: boolean;
  updated_at: Date;
}

export const getConnections = async (
  customerIdentifier: string
): Promise<Connection[]> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/connections`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: customerIdentifier }),
  });
  const connections = await response.json();
  return connections;
};
