import { useQuery } from "@tanstack/react-query";
import { Trophy, Calendar, Crown, Medal, Award, User, RotateCcw, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Custom API function for the specific date range
const fetchCustomLeaderboard = async () => {
  const response = await fetch("/api/affiliates?start_at=2025-09-26&end_at=2025-10-26");
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const data = await response.json();
  
  // The backend already processes and ranks the data
  return data.data || [];
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function CustomLeaderboard() {
  const { data: affiliates = [], isLoading, error, refetch } = useQuery({
    queryKey: ["custom-leaderboard"],
    queryFn: fetchCustomLeaderboard,
    refetchInterval: 30000,
  });

  const topThree = affiliates.slice(0, 3);
  const topFourToTen = affiliates.slice(3, 10);

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "from-yellow-400 via-yellow-500 to-yellow-600",
          border: "border-yellow-400",
          text: "text-yellow-900",
          glow: "shadow-yellow-400/50",
          icon: <Crown className="text-yellow-900" size={40} />,
        };
      case 2:
        return {
          bg: "from-gray-300 via-gray-400 to-gray-500", 
          border: "border-gray-400",
          text: "text-gray-900",
          glow: "shadow-gray-400/50",
          icon: <Medal className="text-gray-900" size={40} />,
        };
      case 3:
        return {
          bg: "from-orange-400 via-orange-500 to-orange-600",
          border: "border-orange-400", 
          text: "text-orange-900",
          glow: "shadow-orange-400/50",
          icon: <Award className="text-orange-900" size={40} />,
        };
      default:
        return {
          bg: "from-purple-400 via-purple-500 to-purple-600",
          border: "border-purple-400",
          text: "text-purple-900", 
          glow: "shadow-purple-400/50",
          icon: <User className="text-purple-900" size={32} />,
        };
    }
  };

  return (
    <div className="min-h-screen crypto-bg particle-bg">
      {/* Header */}
      <section className="py-12 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold mb-6 animate-scale-in animate-glow" style={{ animationDelay: '0.2s' }}>
            <Trophy className="text-primary-foreground animate-bounce-subtle" size={36} />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Trophy className="text-primary mr-4 inline animate-bounce-subtle" size={40} />
            CUSTOM-LEADERBOARD
            <Trophy className="text-primary ml-4 inline animate-bounce-subtle" size={40} />
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Calendar className="text-primary animate-pulse-slow" size={20} />
            <p className="text-2xl font-bold text-gradient animate-gradient bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">26 Sept - 26 Oct</p>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8">
            Custom period leaderboard with enhanced visuals
          </p>
          
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="gradient-gold text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center mx-auto animate-scale-in hover:scale-105 animate-glow" style={{ animationDelay: '1s' }}
          >
            <RotateCcw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={16} />
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading custom leaderboard data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert className="border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load custom leaderboard data. Please try refreshing.
              {error instanceof Error && (
                <div className="mt-2 text-xs opacity-75">
                  Error: {error.message}
                </div>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          {affiliates.length === 0 ? (
            /* No Data State */
            <section className="py-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="leaderboard-card p-16 rounded-xl animate-glow particle-bg animate-border-glow">
                  <Trophy className="text-muted-foreground mx-auto mb-8 animate-bounce-subtle animate-glow" size={80} />
                  <h2 className="text-6xl font-bold text-gradient mb-4 animate-gradient bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-pulse-slow">
                    No one wagered till now
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    The leaderboard is waiting for some action during this custom period!
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <>
              {/* Top 3 Winners - Premium Cards */}
              {topThree.length > 0 && (
                <section className="py-12">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12 flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      <Crown className="text-primary mr-3 animate-bounce-subtle" size={32} />
                      TOP 3 CHAMPIONS
                      <Crown className="text-primary ml-3 animate-bounce-subtle" size={32} />
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {topThree.map((affiliate: any, index: number) => {
                        const colors = getRankColors(affiliate.rank);
                        const delay = index * 0.2;
                        
                        return (
                          <div
                            key={affiliate.id}
                            className={`relative p-8 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.border} border-2 shadow-2xl ${colors.glow} transform hover:scale-105 transition-all duration-500 animate-scale-in animate-border-glow`}
                            style={{ animationDelay: `${delay + 0.6}s` }}
                          >
                            {/* Rank Badge */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-background border-4 border-current flex items-center justify-center">
                              <span className={`font-bold text-xl ${colors.text}`}>
                                {affiliate.rank}
                              </span>
                            </div>
                            
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center animate-pulse-slow animate-glow" style={{ animationDelay: `${delay + 1}s` }}>
                                <div className="animate-bounce-subtle">{colors.icon}</div>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="text-center">
                              <h3 className={`text-2xl font-bold mb-2 ${colors.text}`}>
                                {affiliate.username}
                              </h3>
                              <p className={`text-sm font-medium mb-4 ${colors.text} opacity-80`}>
                                Rank #{affiliate.rank} Champion
                              </p>
                              
                              <div className="space-y-3">
                                <div className="bg-white/10 rounded-lg p-3">
                                  <div className={`text-sm ${colors.text} opacity-80`}>Total Wagered</div>
                                  <div className={`text-xl font-bold ${colors.text}`}>
                                    {formatCurrency(affiliate.totalWagered)}
                                  </div>
                                </div>
                                
                                <div className="bg-white/10 rounded-lg p-3">
                                  <div className={`text-sm ${colors.text} opacity-80`}>Bets Placed</div>
                                  <div className={`text-xl font-bold ${colors.text}`}>
                                    {formatNumber(affiliate.betCount)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Enhanced Effects for Ranks */}
                            {affiliate.rank === 1 && (
                              <>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient bg-gradient-to-r from-yellow-400/20 via-white/10 to-yellow-400/20"></div>
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-yellow-400/50 via-yellow-500/50 to-yellow-600/50 animate-glow -z-10"></div>
                              </>
                            )}
                            {affiliate.rank === 2 && (
                              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gray-400/30 via-gray-500/30 to-gray-600/30 animate-glow -z-10"></div>
                            )}
                            {affiliate.rank === 3 && (
                              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-400/30 via-orange-500/30 to-orange-600/30 animate-glow -z-10"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {/* Top 4-10 Animated Table */}
              {topFourToTen.length > 0 && (
                <section className="py-12">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-foreground mb-8 flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      <Trophy className="text-primary mr-3 animate-bounce-subtle" size={28} />
                      TOP COMPETITORS (4-10)
                      <Trophy className="text-primary ml-3 animate-bounce-subtle" size={28} />
                    </h2>
                    
                    <div className="leaderboard-card rounded-xl overflow-hidden animate-scale-in animate-border-glow" style={{ animationDelay: '0.6s' }}>
                      <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 px-6 py-4 border-b border-border animate-gradient animate-glow">
                        <h3 className="text-xl font-bold text-foreground">Elite Performers</h3>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wide">Rank</th>
                              <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wide">Player</th>
                              <th className="px-6 py-4 text-right text-sm font-bold text-primary uppercase tracking-wide">Wagered</th>
                              <th className="px-6 py-4 text-right text-sm font-bold text-primary uppercase tracking-wide">Bets</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {topFourToTen.map((affiliate: any, index: number) => {
                              const delay = index * 0.1;
                              
                              return (
                                <tr
                                  key={affiliate.id}
                                  className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300 animate-fade-in"
                                  style={{ animationDelay: `${delay}s` }}
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mr-3 animate-pulse">
                                        <span className="font-bold text-white">{affiliate.rank}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center">
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center mr-4">
                                        <User className="text-foreground" size={24} />
                                      </div>
                                      <div>
                                        <div className="text-lg font-bold text-foreground">
                                          {affiliate.username}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          ID: {String(affiliate.id).substring(0, 8)}...
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="text-lg font-bold text-primary animate-pulse">
                                      {formatCurrency(affiliate.totalWagered)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Total volume
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="text-lg font-bold text-green-400">
                                      {formatNumber(affiliate.betCount)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Bets placed
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="px-6 py-4 border-t border-border text-center bg-muted/20">
                        <p className="text-sm text-muted-foreground">
                          Showing top performers for the custom period: 26 Sept - 26 Oct 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}