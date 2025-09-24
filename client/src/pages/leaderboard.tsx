import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Calendar, Clock, CalendarDays, RotateCcw, AlertCircle, Crown, Medal, Award, User } from "lucide-react";
import { affiliateApi, formatCurrency, formatNumber } from "@/lib/api";
import { TimePeriod, Affiliate } from "@/types/affiliate";
import { LoadingSpinner, LoadingCard } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("month");
  const [dateRange, setDateRange] = useState<{start_at: string; end_at: string} | null>(null);

  // Get date range for selected period
  const { data: dateRangeData, isLoading: isLoadingDateRange } = useQuery({
    queryKey: ["/api/date-ranges", selectedPeriod],
    queryFn: () => affiliateApi.getDateRange(selectedPeriod),
  });

  // Update date range when data is fetched
  useEffect(() => {
    if (dateRangeData?.success && dateRangeData.data) {
      setDateRange({
        start_at: dateRangeData.data.start_at,
        end_at: dateRangeData.data.end_at,
      });
    }
  }, [dateRangeData]);

  // Get leaderboard data
  const { 
    data: leaderboardData, 
    isLoading: isLoadingLeaderboard, 
    error,
    refetch 
  } = useQuery({
    queryKey: ["/api/affiliates", dateRange?.start_at, dateRange?.end_at, selectedPeriod],
    queryFn: () => {
      if (!dateRange) throw new Error("Date range not available");
      return affiliateApi.getLeaderboard(dateRange.start_at, dateRange.end_at, selectedPeriod);
    },
    enabled: !!dateRange,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const isLoading = isLoadingDateRange || isLoadingLeaderboard;
  const affiliates = leaderboardData?.data || [];
  const topThree = affiliates.slice(0, 3);
  const allCompetitors = affiliates.slice(3);

  const periodOptions = [
    { value: "today" as TimePeriod, label: "Today", icon: Clock },
    { value: "week" as TimePeriod, label: "This Week", icon: CalendarDays },
    { value: "month" as TimePeriod, label: "This Month", icon: Calendar },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-primary" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-orange-400" size={20} />;
      default:
        return <span className="text-primary font-bold text-sm">{rank}</span>;
    }
  };

  const getRankBadgeColors = (rank: number) => {
    switch (rank) {
      case 1:
        return "gradient-gold";
      case 2:
        return "bg-gray-500/20 border-2 border-gray-400";
      case 3:
        return "bg-orange-500/20 border-2 border-orange-400";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen crypto-bg">
      {/* Header */}
      <section className="py-12 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold mb-6">
            <Trophy className="text-primary-foreground" size={36} />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="text-leaderboard-title">
            <Trophy className="text-primary mr-4 inline" size={40} />
            LEADERBOARDS
            <Trophy className="text-primary ml-4 inline" size={40} />
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8" data-testid="text-leaderboard-description">
            Top performers and their epic achievements
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Live Data • Period:</span>
            <span className="text-primary font-medium" data-testid="text-current-period">
              {periodOptions.find(p => p.value === selectedPeriod)?.label}
            </span>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="gradient-gold text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center"
              data-testid="button-refresh"
            >
              <RotateCcw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={16} />
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </section>

      {/* Time Period Filter */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <span className="text-foreground font-medium flex items-center">
              <Calendar className="mr-2" size={16} />
              Time Period
            </span>
            <div className="flex items-center bg-card rounded-lg p-1 border border-border">
              {periodOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedPeriod(option.value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                      selectedPeriod === option.value
                        ? "gradient-gold text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`button-period-${option.value}`}
                  >
                    <IconComponent className="mr-2" size={16} />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Data Notice */}
          <div className="leaderboard-card p-4 rounded-lg mb-8">
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <AlertCircle className="text-primary mr-2" size={16} />
              <span data-testid="text-data-notice">
                Rankings update automatically based on your selected time period for accurate leaderboards.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center" data-testid="loading-state">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading leaderboard data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert className="border-destructive" data-testid="error-state">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load leaderboard data. Please try refreshing the page.
              {error instanceof Error && (
                <div className="mt-2 text-xs opacity-75">
                  Error: {error.message}
                </div>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Leaderboard Content */}
      {!isLoading && !error && (
        <section className="py-8" data-testid="leaderboard-content">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Medal className="text-primary mr-3" size={24} />
              TOP WAGERERS
            </h2>

            {/* Top 3 Performers */}
            {topThree.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {topThree.map((affiliate) => (
                  <div
                    key={affiliate.id}
                    className={`leaderboard-card p-6 rounded-xl text-center ${
                      affiliate.rank === 1 ? "top-performer" : ""
                    }`}
                    data-testid={`card-top-performer-${affiliate.rank}`}
                  >
                    <div className="relative mb-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2 ${getRankBadgeColors(affiliate.rank)}`}>
                        {affiliate.rank === 1 ? (
                          <Crown className="text-primary-foreground" size={32} />
                        ) : (
                          <User className={affiliate.rank === 2 ? "text-gray-400" : "text-orange-400"} size={32} />
                        )}
                      </div>
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                        affiliate.rank === 1 ? "bg-primary" : 
                        affiliate.rank === 2 ? "bg-gray-400" : "bg-orange-400"
                      }`}>
                        <span className={`font-bold text-sm ${
                          affiliate.rank === 1 ? "text-primary-foreground" :
                          affiliate.rank === 2 ? "text-gray-900" : "text-orange-900"
                        }`}>
                          {affiliate.rank}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1" data-testid={`text-username-${affiliate.rank}`}>
                      {affiliate.username}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3" data-testid={`text-rank-${affiliate.rank}`}>
                      Rank #{affiliate.rank}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Wagered</span>
                        <span className="text-primary font-bold" data-testid={`text-wagered-${affiliate.rank}`}>
                          {formatCurrency(affiliate.totalWagered)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bets Placed</span>
                        <span className="text-green-400 font-medium" data-testid={`text-bets-${affiliate.rank}`}>
                          {formatNumber(affiliate.betCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* All Competitors Table */}
            {affiliates.length > 0 && (
              <div className="leaderboard-card rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="text-xl font-bold text-foreground flex items-center">
                    <Trophy className="text-primary mr-3" size={20} />
                    ALL COMPETITORS
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="table-all-competitors">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">RANK</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">PLAYER</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">WAGERED</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">BETS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {affiliates.map((affiliate) => (
                        <tr
                          key={affiliate.id}
                          className="hover:bg-muted/10 transition-colors duration-200"
                          data-testid={`row-affiliate-${affiliate.rank}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                                {getRankIcon(affiliate.rank)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                                <User className="text-muted-foreground" size={20} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground" data-testid={`text-table-username-${affiliate.rank}`}>
                                  {affiliate.username}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ID: {affiliate.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="text-sm font-bold text-primary" data-testid={`text-table-wagered-${affiliate.rank}`}>
                              {formatCurrency(affiliate.totalWagered)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Total volume
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="text-sm font-bold text-green-400" data-testid={`text-table-bets-${affiliate.rank}`}>
                              {formatNumber(affiliate.betCount)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Bets placed
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground" data-testid="text-table-summary">
                    Showing {affiliates.length} total players • 
                    Period: {dateRange?.start_at} to {dateRange?.end_at}
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && affiliates.length === 0 && (
              <div className="leaderboard-card p-12 rounded-xl text-center" data-testid="empty-state">
                <Trophy className="text-muted-foreground mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-foreground mb-2">No Data Available</h3>
                <p className="text-muted-foreground">
                  No affiliate data found for the selected time period. Try selecting a different period or check back later.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
