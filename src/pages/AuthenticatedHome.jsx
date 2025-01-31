import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Activity, 
  Clock, 
  Code2, 
  Users, 
  Star,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock4
} from 'lucide-react';

export default function AuthenticatedHome() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';

  // Datos de ejemplo
  const stats = {
    completedProjects: 5,
    contributedHours: 120,
    teamworkRating: 4.8,
    skillsGained: 12
  };

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      role: "Frontend Developer",
      progress: 75,
      nextDeadline: "2024-03-15",
      unreadMessages: 3
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      role: "UI/UX Designer",
      progress: 40,
      nextDeadline: "2024-03-20",
      unreadMessages: 0
    }
  ];

  const recentActivity = [
    {
      id: 1,
      message: "Completed milestone: User Authentication",
      project: "E-commerce Platform",
      time: "2 hours ago"
    },
    {
      id: 2,
      message: "New comment on your design proposal",
      project: "Social Media Dashboard",
      time: "5 hours ago"
    },
    {
      id: 3,
      message: "Team meeting scheduled",
      project: "E-commerce Platform",
      time: "1 day ago"
    }
  ];

  const recommendedProjects = [
    {
      id: 1,
      title: "AI-Powered Task Manager",
      description: "Building a smart task management system with ML capabilities",
      matchScore: 95,
      technologies: ["React", "Python", "TensorFlow"]
    },
    {
      id: 2,
      title: "Mobile Fitness App",
      description: "Creating a cross-platform fitness tracking application",
      matchScore: 88,
      technologies: ["React Native", "Node.js", "MongoDB"]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-lg border bg-card text-card-foreground p-8">
          <div className="hero-grid absolute inset-0"></div>
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
              {t('authenticatedHome.welcome', { name: userName })}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t('authenticatedHome.summary')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="feature-card rounded-lg border bg-background/50 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[hsl(var(--accent-purple))]" />
                  <div>
                    <p className="text-2xl font-bold">{stats.completedProjects}</p>
                    <p className="text-sm text-muted-foreground">{t('authenticatedHome.stats.completedProjects')}</p>
                  </div>
                </div>
              </div>
              <div className="feature-card rounded-lg border bg-background/50 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <Clock4 className="w-5 h-5 text-[hsl(var(--accent-blue))]" />
                  <div>
                    <p className="text-2xl font-bold">{stats.contributedHours}h</p>
                    <p className="text-sm text-muted-foreground">{t('authenticatedHome.stats.hoursContributed')}</p>
                  </div>
                </div>
              </div>
              <div className="feature-card rounded-lg border bg-background/50 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-[hsl(var(--accent-cyan))]" />
                  <div>
                    <p className="text-2xl font-bold">{stats.teamworkRating}</p>
                    <p className="text-sm text-muted-foreground">{t('authenticatedHome.stats.teamworkRating')}</p>
                  </div>
                </div>
              </div>
              <div className="feature-card rounded-lg border bg-background/50 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-[hsl(var(--accent-purple))]" />
                  <div>
                    <p className="text-2xl font-bold">{stats.skillsGained}</p>
                    <p className="text-sm text-muted-foreground">{t('authenticatedHome.stats.skillsGained')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t('authenticatedHome.activeProjects.title')}</h2>
              <Link 
                to="/projects" 
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                {t('authenticatedHome.activeProjects.viewAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {activeProjects.map(project => (
                <div key={project.id} className="feature-card rounded-lg border bg-card text-card-foreground p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.role}</p>
                    </div>
                    {project.unreadMessages > 0 && (
                      <span className="px-2 py-1 bg-[hsl(var(--accent-purple))] text-white text-xs rounded-full">
                        {project.unreadMessages} {t('authenticatedHome.activeProjects.new')}
                      </span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('authenticatedHome.activeProjects.progress')}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {t('authenticatedHome.activeProjects.nextDeadline')}: {new Date(project.nextDeadline).toLocaleDateString()}
                      </span>
                      <Link 
                        to={`/projects/${project.id}`}
                        className="text-[hsl(var(--accent-purple))] hover:underline"
                      >
                        {t('authenticatedHome.activeProjects.viewDetails')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('authenticatedHome.recentActivity.title')}</h2>
            <div className="feature-card rounded-lg border bg-card text-card-foreground p-6">
              <div className="space-y-6">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.project} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Projects */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{t('authenticatedHome.recommendedProjects.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedProjects.map(project => (
              <div key={project.id} className="feature-card rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-[hsl(var(--accent-purple))] text-white text-xs rounded-full">
                    {project.matchScore}% {t('authenticatedHome.recommendedProjects.match')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-muted rounded-md text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 w-full"
                >
                  {t('authenticatedHome.recommendedProjects.viewProject')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}