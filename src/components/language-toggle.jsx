import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  const getLanguageLabel = (lang) => {
    switch (lang) {
      case 'es':
        return 'ES';
      case 'en':
        return 'EN';
      default:
        return lang.toUpperCase();
    }
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[80px] border-none bg-transparent hover:bg-transparent focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0">
        <SelectValue>
          {getLanguageLabel(i18n.language)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">ES</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
}