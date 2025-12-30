export type DbContent = {
  content: string;
  expires_at: Date | null;
  remaining_views: number | null;
};

export type PastFormBody = {
  content: string;
  ttl_seconds?: number | null;
  max_views?: number | null;
};

export type PastResponse = {
  id: string;
  url: string;
};
