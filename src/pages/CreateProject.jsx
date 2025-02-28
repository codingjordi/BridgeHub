import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/services/supabase';
import { useToast } from "@/hooks/useToast";

export default function CreateProject() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills_required: '',
    modality: 'remote',
    max_members: 5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  const handleSkillsChange = (e) => {
    setFormData(prev => ({
      ...prev,
      skills_required: e.target.value
    }));
  };

  const handleModalityChange = (e) => {
    setFormData(prev => ({
      ...prev,
      modality: e.target.value
    }));
  };

  const handleMaxMembersChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 2, 2), 10);
    setFormData(prev => ({
      ...prev,
      max_members: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar que todos los campos requeridos estén presentes
      if (!formData.title || !formData.description || !formData.skills_required) {
        throw new Error(t('createProject.error.requiredFields'));
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title: formData.title.trim(),
            description: formData.description.trim(),
            skills_required: formData.skills_required.trim(),
            modality: formData.modality,
            max_members: formData.max_members,
            owner_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: t('createProject.success.title'),
        description: t('createProject.success.description'),
      });

      navigate(`/projects/${data.id}`);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: t('createProject.error.title'),
        description: error.message || t('createProject.error.description'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
              {t('createProject.title')}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  {t('createProject.form.title')}
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t('createProject.form.titlePlaceholder')}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {t('createProject.form.description')}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t('createProject.form.descriptionPlaceholder')}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="skills_required" className="text-sm font-medium">
                  {t('createProject.form.skills')}
                </label>
                <input
                  id="skills_required"
                  name="skills_required"
                  value={formData.skills_required}
                  onChange={handleSkillsChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t('createProject.form.skillsPlaceholder')}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="modality" className="text-sm font-medium">
                  {t('createProject.form.modality')}
                </label>
                <select
                  id="modality"
                  name="modality"
                  value={formData.modality}
                  onChange={handleModalityChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="remote">{t('createProject.form.modalities.remote')}</option>
                  <option value="hybrid">{t('createProject.form.modalities.hybrid')}</option>
                  <option value="presential">{t('createProject.form.modalities.presential')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="max_members" className="text-sm font-medium">
                  {t('createProject.form.maxMembers')}
                </label>
                <input
                  id="max_members"
                  name="max_members"
                  type="number"
                  min="2"
                  max="10"
                  value={formData.max_members}
                  onChange={handleMaxMembersChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full"
              >
                {isSubmitting ? t('createProject.form.submitting') : t('createProject.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}