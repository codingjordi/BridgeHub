import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/services/supabase';
import { Github, Linkedin, Disc as Discord, Edit2, Calendar, MapPin, Link as LinkIcon, Star, Users, Briefcase } from 'lucide-react';
import { useToast } from "@/hooks/useToast";

export default function Profile() {
  const { t } = useTranslation();
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    linkedin_url: '',
    github_url: '',
    discord_url: '',
    header: ''
  });

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error) throw error;

      if (profile) {
        setProfile(profile);
        setFormData({
          full_name: profile.full_name || '',
          bio: profile.bio || '',
          linkedin_url: profile.linkedin_url || '',
          github_url: profile.github_url || '',
          discord_url: profile.discord_url || '',
          header: profile.header || ''
        });
      } else {
        navigate('/404');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load profile"
      });
      navigate('/404');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          linkedin_url: formData.linkedin_url,
          github_url: formData.github_url,
          discord_url: formData.discord_url,
          header: formData.header,
          updated_at: new Date().toISOString()
        })
        .eq('id', authUser.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      
      setIsEditing(false);
      await fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not update profile"
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile.full_name || '',
      bio: profile.bio || '',
      linkedin_url: profile.linkedin_url || '',
      github_url: profile.github_url || '',
      discord_url: profile.discord_url || '',
      header: profile.header || ''
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--accent-purple))]"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Profile not found</h1>
          <p className="text-muted-foreground">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isOwner = authUser?.id === profile.id;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="relative mb-8">
          <div className="h-48 rounded-lg bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] mb-16"></div>
          <div className="absolute bottom-0 left-8 transform translate-y-1/2">
            <div className="p-1 rounded-full bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-32 h-32 rounded-full border-4 border-background"
              />
            </div>
            
          </div>
          {isOwner && !isEditing && (
            <button
              onClick={handleEdit}
              className="absolute bottom-0 right-4 transform translate-y-1/2 btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {t('profile.edit')}
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="space-y-8">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-2 rounded-md border bg-background"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={formData.header}
                onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                className="w-full px-4 py-2 rounded-md border bg-background"
                placeholder="Profile Header"
              />
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-2 rounded-md border bg-background"
                placeholder="Bio"
                rows={4}
              />
              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  placeholder="LinkedIn URL"
                />
                <input
                  type="text"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  placeholder="GitHub URL"
                />
                <input
                  type="text"
                  value={formData.discord_url}
                  onChange={(e) => setFormData({ ...formData, discord_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  placeholder="Discord URL"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className=''>
                <h1 className="text-3xl font-bold pt-3">{profile.full_name}</h1>
                <p className="text-muted-foreground">@{profile.username}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                )}
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                )}
                {profile.discord_url && (
                  <a
                    href={profile.discord_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <Discord className="w-5 h-5 mr-2" />
                    Discord
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="feature-card rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 mr-2 text-[hsl(var(--accent-purple))]" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">{t('profile.projects')}</p>
                    </div>
                  </div>
                </div>
                <div className="feature-card rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 mr-2 text-[hsl(var(--accent-blue))]" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">{t('profile.collaborations')}</p>
                    </div>
                  </div>
                </div>
                <div className="feature-card rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 mr-2 text-[hsl(var(--accent-cyan))]" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">{t('profile.rating')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {profile.header && (
                <h2 className="text-xl font-semibold text-[hsl(var(--accent-purple))]">
                  {profile.header}
                </h2>
              )}

              {profile.bio && (
                <p className="text-lg">{profile.bio}</p>
              )}

              

              
            </>
          )}
        </div>
      </div>
    </div>
  );
}