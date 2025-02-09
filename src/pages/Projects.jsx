import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import { supabase } from '@/services/supabase';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [technology, setTechnology] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchProjects();

    const projectsSubscription = supabase
      .channel('projects_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectsSubscription);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:owner_id (
            full_name,
            avatar_url,
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills_required.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTechnology = technology === '' || 
      project.skills_required.toLowerCase().includes(technology.toLowerCase());

    const matchesRole = role === '' || 
      project.skills_required.toLowerCase().includes(role.toLowerCase());

    return matchesSearch && matchesTechnology && matchesRole;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
            {t('projects.title')}
          </h1>
          <Link
            to="/projects/create"
            className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
          >
            <Plus className="mr-2 h-4 w-4" /> {t('projects.create')}
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder={t('projects.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 pl-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <select 
            className="h-10 rounded-md border border-input bg-background/50 backdrop-blur-sm px-3"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          >
            <option value="">{t('projects.filter.technology')}</option>
            <option value="react">{t('projects.filter.options.react')}</option>
            <option value="node">{t('projects.filter.options.node')}</option>
            <option value="python">{t('projects.filter.options.python')}</option>
          </select>
          <select 
            className="h-10 rounded-md border border-input bg-background/50 backdrop-blur-sm px-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">{t('projects.filter.role')}</option>
            <option value="frontend">{t('projects.filter.options.frontend')}</option>
            <option value="backend">{t('projects.filter.options.backend')}</option>
            <option value="fullstack">{t('projects.filter.options.fullstack')}</option>
            <option value="design">{t('projects.filter.options.design')}</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--accent-purple))] mx-auto"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t('projects.noProjects')}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project}/>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}