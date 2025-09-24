import { Trophy, Users, DollarSign, Crown, ExternalLink, TrendingUp, Shield } from "lucide-react";
import { SiDiscord, SiKickstarter } from "react-icons/si";
import { GiDiceTwentyFacesTwenty } from "react-icons/gi";
import { Link } from "wouter";
import { GoldenRain } from "@/components/ui/golden-rain";
import goldenRainBg from "@assets/file_000000001d1c61faa2b590177f31bb20_1757072776658.png";

export default function Home() {
  const socialLinks = [
    {
      name: "Discord",
      url: "https://discord.gg/y3Tt9XTjPy",
      icon: SiDiscord,
      color: "text-[#5865F2]",
      bgColor: "bg-[#5865F2]/10 hover:bg-[#5865F2]/20",
      borderColor: "border-[#5865F2]/30",
    },
    {
      name: "Kick",
      url: "https://kick.com/bankroll-broos",
      icon: SiKickstarter,
      color: "text-green-400",
      bgColor: "bg-green-500/10 hover:bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      name: "Play on Rainbet",
      url: "https://rainbet.com/?r=bankbros",
      icon: GiDiceTwentyFacesTwenty,
      color: "text-primary-foreground",
      bgColor: "gradient-gold hover:shadow-lg",
      borderColor: "",
      special: true,
    },
  ];

  return (
    <div className="min-h-screen relative" style={{backgroundImage: `url(${goldenRainBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <GoldenRain />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 hero-pattern" style={{zIndex: 10}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Background Chart Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <TrendingUp size={320} className="text-primary" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Trophy className="text-primary mr-2" size={16} />
              <span className="text-primary font-medium" data-testid="text-realtime-badge">
                Real-Time Affiliate Tracking
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
              <span className="text-foreground">Track Elite</span><br />
              <span className="text-gradient">Rainbet Affiliates</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-description">
              Real-time statistics, rankings, and performance metrics updated every second. 
              Join the most competitive and passionate gaming community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/leaderboard">
                <button className="gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 pulse-gold" data-testid="button-view-leaderboards">
                  <Trophy className="mr-2 inline" size={20} />
                  VIEW LEADERBOARDS
                </button>
              </Link>
              
              <a
                href="https://kick.com/bankroll-broos"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center"
                data-testid="link-watch-stream"
              >
                <SiKickstarter className="mr-2" size={20} />
                WATCH STREAM
                <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 bg-card/50 relative" style={{zIndex: 10}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Players */}
            <div className="leaderboard-card p-8 rounded-xl text-center" data-testid="card-total-players">
              <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 float-animation">
                <Users className="text-primary-foreground" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Active Affiliates</h3>
              <p className="text-4xl font-bold text-gradient" data-testid="text-total-players">
                Live Data
              </p>
              <p className="text-muted-foreground mt-2">Real-time tracking</p>
            </div>

            {/* Total Wagered */}
            <div className="leaderboard-card p-8 rounded-xl text-center" data-testid="card-total-wagered">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto mb-4 float-animation" style={{animationDelay: "0.5s"}}>
                <DollarSign className="text-green-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Total Volume</h3>
              <p className="text-4xl font-bold text-green-400" data-testid="text-total-wagered">
                Real-time
              </p>
              <p className="text-muted-foreground mt-2">Combined wagering</p>
            </div>

            {/* Potential Prizes */}
            <div className="leaderboard-card p-8 rounded-xl text-center" data-testid="card-potential-prizes">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center mx-auto mb-4 float-animation" style={{animationDelay: "1s"}}>
                <Crown className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Competition</h3>
              <p className="text-4xl font-bold text-purple-400" data-testid="text-potential-prizes">
                Active
              </p>
              <p className="text-muted-foreground mt-2">Ongoing rankings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 relative" style={{zIndex: 10}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-social-heading">
            Follow My Socials
          </h2>
          <p className="text-muted-foreground mb-8" data-testid="text-social-description">
            Stay connected with the latest updates and community highlights
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-200 hover:scale-105 border ${
                    link.special ? link.bgColor : `${link.bgColor} ${link.borderColor}`
                  }`}
                  data-testid={`link-social-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <IconComponent className={link.color} size={24} />
                  <span className={link.special ? "text-primary-foreground" : "text-foreground"}>
                    {link.name}
                  </span>
                  <ExternalLink 
                    className={link.special ? "text-primary-foreground" : "text-muted-foreground"} 
                    size={16} 
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsible Gaming */}
      <section className="py-12 bg-card/30 relative" style={{zIndex: 10}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="leaderboard-card p-8 rounded-xl" data-testid="card-responsible-gaming">
            <div className="flex items-center justify-center mb-4">
              <Shield className="text-primary mr-3" size={24} />
              <h3 className="text-xl font-bold text-foreground">Responsible Gaming</h3>
            </div>
            <p className="text-muted-foreground text-center mb-6" data-testid="text-responsible-gaming">
              This platform is for entertainment purposes. Gambling can be addictive and should be done 
              responsibly. We promote safe gaming practices and encourage you to set limits.
            </p>
            <div className="text-center">
              <a
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 inline-flex items-center"
                data-testid="link-get-help"
              >
                <Shield className="mr-2" size={16} />
                Get Help at BeGambleAware.org
                <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
