import { useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";

export const useProfile = () => {
    const context = useContext(ProfileContext)
    if(context === undefined) {
        throw new Error('useProfile must be used inside a ProfileProvider. Check your main.jsx, gorgeous 👀')
    }
    return context
}