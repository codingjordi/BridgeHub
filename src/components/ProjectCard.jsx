import { useNavigate } from 'react-router-dom';
import { Users, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProjectCard({ project }) {

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div 
                key={project.id} 
                className="feature-card rounded-lg border bg-card/80 backdrop-blur-sm text-card-foreground shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">{t('projects.technologies')}</p>
                      <div className="flex gap-2 flex-wrap">
                        {project.skills_required.split(',').slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-[hsl(var(--accent-purple))] text-white rounded-md text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                        {project.skills_required.split(',').length > 3 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-sm">
                            +{project.skills_required.split(',').length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={project.profiles?.avatar_url || "https://avvekmzjzxuqnrrxgukg.supabase.co/storage/v1/object/public/public_bucket/space_invader_icon.png"}
                          alt="Creator"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-muted-foreground">
                          {project.profiles?.username || 'Anonymous'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="capitalize">{project.modality}</span>
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.max_members}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    );
}