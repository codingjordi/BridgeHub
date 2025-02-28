import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/services/supabase';
import { Users, Calendar, MapPin, ArrowLeft, Edit2, UserMinus } from 'lucide-react';
import { useToast } from "@/hooks/useToast";

export default function ProjectDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [project, setProject] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [applications, setApplications] = useState([]);
  const [members, setMembers] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationText, setApplicationText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
      setLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProject();
    if (userProfile) {
      checkApplicationStatus();
    }
  }, [id, userProfile]);

  useEffect(() => {
    if (project?.owner?.id === userProfile?.id) {
      fetchApplications();
    }
    fetchMembers();
  }, [project, userProfile]);

  const fetchUserProfile = async () => {
    try {
      setLoadingProfile(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load user profile"
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchProject = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          owner:owner_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load project details"
      });
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      setLoadingMembers(true);
      const { data, error } = await supabase
        .from('project_profiles')
        .select(`
          *,
          profiles:profile_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('project_id', id);

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load project members"
      });
    } finally {
      setLoadingMembers(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          profiles:profile_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('project_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load applications"
      });
    } finally {
      setLoadingApplications(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('project_id', id)
        .eq('profile_id', userProfile.id);

      if (error) throw error;
      setHasApplied(data && data.length > 0);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!applicationText.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide an application text"
      });
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('applications')
        .insert({
          project_id: id,
          profile_id: userProfile.id,
          application_text: applicationText.trim()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your application has been submitted successfully"
      });
      setShowApplicationModal(false);
      setApplicationText('');
      setHasApplied(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not submit your application. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplicationStatus = async (applicationId, newStatus) => {
    try {
      if (newStatus === 'accepted') {
        const { data: application } = await supabase
          .from('applications')
          .select('profile_id')
          .eq('id', applicationId)
          .single();

        const { error: memberError } = await supabase
          .from('project_profiles')
          .insert({
            project_id: id,
            profile_id: application.profile_id,
            position: 'Member'
          });

        if (memberError) throw memberError;
      }

      const { error: statusError } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (statusError) throw statusError;

      toast({
        title: "Success",
        description: `Application ${newStatus} successfully`
      });

      fetchApplications();
      fetchMembers();
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not update application status"
      });
    }
  };

  const handleRemoveMember = async (profileId) => {
    try {
      const { error } = await supabase
        .from('project_profiles')
        .delete()
        .eq('project_id', id)
        .eq('profile_id', profileId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Member removed successfully"
      });

      fetchMembers();
    } catch (error) {
      console.error('Error removing member:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not remove member"
      });
    }
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--accent-purple))]"></div>
      </div>
    );
  }

  /* if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Project not found</h1>
          <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  } */

  const isOwner = userProfile?.id === project?.owner?.id;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/projects')}
            className="text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('project.details.back')}
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <div className='md:max-w-[600px] lg:w-full'>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>

              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Link 
                  to={`/profile/${project.owner.username}`}
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <img
                    src={project.owner.avatar_url || "https://avvekmzjzxuqnrrxgukg.supabase.co/storage/v1/object/public/public_bucket/space_invader_icon.png"}
                    alt={project.owner.full_name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{project.owner.username}</span>
                </Link>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            {isOwner && (
              <button
                onClick={() => navigate(`/projects/${project.id}/edit`)}
                className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {t('project.details.edit')}
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="feature-card rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">{t('project.details.description')}</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
              </div>

              <div className="feature-card rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">{t('project.details.required.skills')}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.skills_required.split(',').map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[hsl(var(--accent-purple))] text-white rounded-md text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="feature-card rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">{t('project.details.team.members')}</h2>
                {loadingMembers ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[hsl(var(--accent-purple))]"></div>
                  </div>
                ) : members.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">{t('project.details.team.empty')}</p>
                ) : (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <Link
                          to={`/profile/${member.profiles.username}`}
                          className="flex items-center gap-2 hover:text-foreground"
                        >
                          <img
                            src={member.profiles.avatar_url || "https://avvekmzjzxuqnrrxgukg.supabase.co/storage/v1/object/public/public_bucket/space_invader_icon.png"}
                            alt={member.profiles.full_name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{member.profiles.full_name}</p>
                            <p className="text-sm text-muted-foreground">@{member.profiles.username}</p>
                          </div>
                        </Link>
                        {isOwner && member.profile_id !== project.owner.id && (
                          <button
                            onClick={() => handleRemoveMember(member.profile_id)}
                            className="text-red-500 hover:text-red-600"
                            title="Remove member"
                          >
                            <UserMinus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isOwner && (
                <div className="feature-card rounded-lg border bg-card p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('project.details.applications')}</h2>
                  {loadingApplications ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[hsl(var(--accent-purple))]"></div>
                    </div>
                  ) : applications.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">{t('project.details.applications.empty')}</p>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div key={application.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Link
                              to={`/profile/${application.profiles.username}`}
                              className="flex items-center gap-2 hover:text-foreground"
                            >
                              <img
                                src={application.profiles.avatar_url || "https://avvekmzjzxuqnrrxgukg.supabase.co/storage/v1/object/public/public_bucket/space_invader_icon.png"}
                                alt={application.profiles.full_name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="font-medium">{application.profiles.full_name}</p>
                                <p className="text-sm text-muted-foreground">@{application.profiles.username}</p>
                              </div>
                            </Link>
                            <div className="flex items-center gap-2">
                              {application.status === 'pending' ? (
                                <>
                                  <button
                                    onClick={() => handleApplicationStatus(application.id, 'accepted')}
                                    className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                                  >
                                    {t('project.details.applications.accept')}
                                  </button>
                                  <button
                                    onClick={() => handleApplicationStatus(application.id, 'rejected')}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                                  >
                                    {t('project.details.applications.reject')}
                                  </button>
                                </>
                              ) : (
                                <span className={`px-3 py-1 rounded-md text-sm ${
                                  application.status === 'accepted' 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-red-500 text-white'
                                }`}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{application.application_text}</p>
                          <p className="text-xs text-muted-foreground">
                            {t('project.details.applications.applied_at', { date: new Date(application.created_at).toLocaleDateString()})}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="feature-card rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">{t('project.details.details.title')}</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <div>
                      <p className="text-foreground font-medium">{t('project.details.details.team.size')}</p>
                      <p className="text-sm">{t('project.details.details.max.members', { max_members: project.max_members } )}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="text-foreground font-medium">{t('project.details.details.modality')}</p>
                      <p className="text-sm capitalize">{project.modality}</p>
                    </div>
                  </div>
                </div>
              </div>

              {!isOwner && userProfile && (
                hasApplied ? (
                  <div className="text-center p-4 border rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">{t('project.details.apply.already')}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="w-full btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-10"
                  >
                    {t('project.details.applications.apply')}
                  </button>
                )
              )}

              {!userProfile && (
                <div className="text-center p-4 border rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-2">{t('project.details.applications.sign.in.title')}</p>
                  <Link
                    to="/auth"
                    className="text-sm text-[hsl(var(--accent-purple))] hover:underline"
                  >
                    {t('project.details.applications.sign.in.button')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showApplicationModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">{t('project.details.applications.modal.title')}</h2>
              <p className="text-sm text-muted-foreground">
                {t('project.details.applications.modal.description')}
              </p>
            </div>
            <form onSubmit={handleApply} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="application-text" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('project.details.applications.modal.text.label')}
                </label>
                <textarea
                  id="application-text"
                  value={applicationText}
                  onChange={(e) => setApplicationText(e.target.value)}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t('project.details.applications.modal.text.placeholder')}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4"
                >
                  {t('project.details.applications.modal.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4"
                >
                  {submitting ? t('project.details.applications.modal.submitting') : t('project.details.applications.modal.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}