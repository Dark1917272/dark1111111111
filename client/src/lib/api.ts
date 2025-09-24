import { AffiliateApiResponse, DateRange, TimePeriod } from "@/types/affiliate";

const API_BASE = "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0
    );
  }
}

export const affiliateApi = {
  async getLeaderboard(startAt: string, endAt: string, period?: TimePeriod): Promise<AffiliateApiResponse> {
    const params = new URLSearchParams({
      start_at: startAt,
      end_at: endAt,
    });

    if (period) {
      params.append("period", period);
    }

    return fetchApi<AffiliateApiResponse>(`/affiliates?${params.toString()}`);
  },

  async getDateRange(period: TimePeriod): Promise<{ success: boolean; data: DateRange }> {
    return fetchApi<{ success: boolean; data: DateRange }>(`/date-ranges/${period}`);
  },
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};
