import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const API_KEY = process.env.RAINBET_API_KEY || "BTeNwifkLGoRwhhNsnEmxlRyA35eM35k";
  const RAINBET_API_BASE = "https://services.rainbet.com/v1/external/affiliates";

  // CORS middleware for API routes
  app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Date range validation schema
  const dateRangeSchema = z.object({
    start_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
    end_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
    period: z.enum(["today", "week", "month"]).optional(),
  });

  // Get affiliate leaderboard data
  app.get("/api/affiliates", async (req, res) => {
    try {
      const validation = dateRangeSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid parameters",
          errors: validation.error.errors,
        });
      }

      const { start_at, end_at } = validation.data;

      // Make API call to Rainbet
      const url = `${RAINBET_API_BASE}?start_at=${start_at}&end_at=${end_at}&key=${API_KEY}`;
      console.log(`[API] Calling Rainbet API: ${url}`);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "BankBros-Leaderboard/1.0",
        },
      });

      if (!response.ok) {
        console.error(`[API] Rainbet API HTTP Error: ${response.status} ${response.statusText}`);
        throw new Error(`Rainbet API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[API] Rainbet API Response:`, JSON.stringify(data, null, 2));

      // Process and rank the data - Rainbet API returns data under "affiliates" key
      const processedData = Array.isArray(data) ? data : data.affiliates || data.data || [];
      console.log(`[API] Processed ${processedData.length} affiliates`);
      
      const rankedAffiliates = processedData
        .map((affiliate: any, index: number) => ({
          id: affiliate.id || affiliate.affiliate_id || `affiliate-${index}`,
          username: affiliate.username || `User${index + 1}`,
          totalWagered: parseFloat(affiliate.wagered_amount || affiliate.total_wagered || "0"),
          totalEarnings: parseFloat(affiliate.total_earnings || "0"),
          betCount: affiliate.bet_count || 0,
          rank: index + 1,
        }))
        .sort((a: any, b: any) => b.totalWagered - a.totalWagered)
        .map((affiliate: any, index: number) => ({
          ...affiliate,
          rank: index + 1,
        }));

      return res.json({
        success: true,
        data: rankedAffiliates,
        total: rankedAffiliates.length,
        period: { start_at, end_at },
      });

    } catch (error) {
      console.error("Error fetching affiliate data:", error);
      
      return res.status(500).json({
        success: false,
        message: "Failed to fetch affiliate data",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Get date ranges for different periods
  app.get("/api/date-ranges/:period", (req, res) => {
    try {
      const { period } = req.params;
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      let startDate: Date;
      let endDate = today;

      switch (period) {
        case "today":
          // Today to today
          startDate = today;
          endDate = today;
          break;
        case "week":
          // Past 6 days to today (7 days total)
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 6);
          endDate = today;
          break;
        case "month":
          // Past 30 days to today
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 30);
          endDate = today;
          break;
        default:
          return res.status(400).json({
            success: false,
            message: "Invalid period. Use 'today', 'week', or 'month'",
          });
      }

      return res.json({
        success: true,
        data: {
          start_at: startDate.toISOString().split("T")[0],
          end_at: endDate.toISOString().split("T")[0],
          period,
        },
      });

    } catch (error) {
      console.error("Error generating date range:", error);
      
      return res.status(500).json({
        success: false,
        message: "Failed to generate date range",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
