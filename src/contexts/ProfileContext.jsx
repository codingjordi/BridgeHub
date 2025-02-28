import { useState, createContext, useEffect } from "react";
import { supabase } from '@/services/supabase'
import { useAuth } from "@/hooks/useAuth";

export const ProfileContext = createContext(null);

export function ProfileProvider({children}) {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuth() || {}

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            if (!user) {
                setUserProfile(null);
                return;
            }

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            setUserProfile(profile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [user]);

    return (
        <ProfileContext.Provider value={{userProfile, fetchUserProfile, isLoading}}>
            {children}
        </ProfileContext.Provider>
    );
}