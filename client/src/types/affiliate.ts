export interface Affiliate {
  id: string;
  username: string;
  totalWagered: number;
  totalEarnings: number;
  betCount: number;
  rank: number;
}

export interface AffiliateApiResponse {
  success: boolean;
  data: Affiliate[];
  total: number;
  period: {
    start_at: string;
    end_at: string;
  };
  message?: string;
  error?: string;
}

export interface DateRange {
  start_at: string;
  end_at: string;
  period: "today" | "week" | "month";
}

export type TimePeriod = "today" | "week" | "month";
