import { useState, useEffect } from "react";

export interface UserProfile {
  pseudo: string;
  firstName: string;
  lastName: string;
  avatarId: string;
  studyLevel: string;
}

export interface AvatarPreset {
  id: string;
  emoji: string;
  label: string;
  bgGradient: string;
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  { id: "einstein", emoji: "🧠", label: "Albert Einstein", bgGradient: "linear-gradient(135deg, #f43f5e, #be123c)" },
  { id: "gauss", emoji: "⚡", label: "Carl Friedrich Gauss", bgGradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)" },
  { id: "pythagoras", emoji: "📐", label: "Pythagore", bgGradient: "linear-gradient(135deg, #10b981, #047857)" },
  { id: "ada", emoji: "💻", label: "Ada Lovelace", bgGradient: "linear-gradient(135deg, #8b5cf6, #5b21b6)" },
  { id: "hypatia", emoji: "🌌", label: "Hypatie d'Alexandrie", bgGradient: "linear-gradient(135deg, #f59e0b, #b45309)" },
  { id: "euler", emoji: "🌀", label: "Leonhard Euler", bgGradient: "linear-gradient(135deg, #a78bfa, #6d28d9)" },
  { id: "newton", emoji: "🍎", label: "Isaac Newton", bgGradient: "linear-gradient(135deg, #06b6d4, #1d4ed8)" },
  { id: "pascal", emoji: "🔺", label: "Blaise Pascal", bgGradient: "linear-gradient(135deg, #ec4899, #be123c)" },
  { id: "fourier", emoji: "🌊", label: "Joseph Fourier", bgGradient: "linear-gradient(135deg, #38bdf8, #0369a1)" },
  { id: "turing", emoji: "🤖", label: "Alan Turing", bgGradient: "linear-gradient(135deg, #34d399, #065f46)" },
  { id: "ramanujan", emoji: "🔢", label: "Srinivasa Ramanujan", bgGradient: "linear-gradient(135deg, #fbbf24, #c2410c)" },
  { id: "kowalevskaya", emoji: "📈", label: "Sofia Kovalevskaya", bgGradient: "linear-gradient(135deg, #6366f1, #4338ca)" },
  { id: "noether", emoji: "🧬", label: "Emmy Noether", bgGradient: "linear-gradient(135deg, #fda4af, #e11d48)" },
  { id: "descartes", emoji: "🗺️", label: "René Descartes", bgGradient: "linear-gradient(135deg, #60a5fa, #1d4ed8)" },
  { id: "curie", emoji: "🧪", label: "Marie Curie", bgGradient: "linear-gradient(135deg, #10b981, #065f46)" },
  { id: "galileo", emoji: "🔭", label: "Galilée", bgGradient: "linear-gradient(135deg, #f472b6, #b91c1c)" }
];

const DEFAULT_PROFILE: UserProfile = {
  pseudo: "",
  firstName: "",
  lastName: "",
  avatarId: "einstein",
  studyLevel: "",
};

export function useLocalAccount() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [notes, setNotes] = useState<string>("");
  const [notepadPassword, setNotepadPasswordState] = useState<string>("");
  const [isNotepadUnlocked, setIsNotepadUnlocked] = useState<boolean>(true);

  // Load profile and notes from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("maths_app_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse local profile", e);
      }
    }

    const savedNotes = localStorage.getItem("maths_app_notepad");
    if (savedNotes) {
      setNotes(savedNotes);
    }

    const savedPassword = localStorage.getItem("maths_app_notepad_password");
    if (savedPassword) {
      setNotepadPasswordState(savedPassword);
      setIsNotepadUnlocked(false); // Locked if password exists
    } else {
      setIsNotepadUnlocked(true); // Open if no password set
    }
  }, []);

  const updateProfile = (newFields: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newFields };
      localStorage.setItem("maths_app_profile", JSON.stringify(updated));
      return updated;
    });
  };

  const saveNotes = (content: string) => {
    setNotes(content);
    localStorage.setItem("maths_app_notepad", content);
  };

  const setNotepadPassword = (password: string) => {
    setNotepadPasswordState(password);
    localStorage.setItem("maths_app_notepad_password", password);
    setIsNotepadUnlocked(true); // Mark as unlocked for this session when setting/updating
  };

  const clearNotepadPassword = () => {
    setNotepadPasswordState("");
    localStorage.removeItem("maths_app_notepad_password");
    setIsNotepadUnlocked(true);
  };

  const unlockNotepad = (password: string): boolean => {
    if (password === notepadPassword) {
      setIsNotepadUnlocked(true);
      return true;
    }
    return false;
  };

  const lockNotepad = () => {
    if (notepadPassword) {
      setIsNotepadUnlocked(false);
    }
  };

  const getActiveAvatar = (): AvatarPreset => {
    return AVATAR_PRESETS.find((a) => a.id === profile.avatarId) || AVATAR_PRESETS[0];
  };

  // Export all app data as a JSON string
  const exportData = (): string => {
    const dataObj = {
      version: 1,
      exportedAt: new Date().toISOString(),
      data: {
        profile,
        notepad: notes,
        notepadPassword,
        progress: JSON.parse(localStorage.getItem("maths_app_progress") || "{}"),
        glossaryXp: localStorage.getItem("guide-maths-custom-xp") || "0",
        onboardingCompleted: localStorage.getItem("onboarding-completed") || "false",
        theme: localStorage.getItem("theme") || "light"
      }
    };
    return JSON.stringify(dataObj, null, 2);
  };

  // Import JSON string back into localStorage
  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || parsed.version !== 1 || !parsed.data) {
        console.error("Invalid export data structure");
        return false;
      }

      const { data } = parsed;

      // 1. Profile
      if (data.profile) {
        localStorage.setItem("maths_app_profile", JSON.stringify(data.profile));
      }

      // 2. Notepad
      if (typeof data.notepad === "string") {
        localStorage.setItem("maths_app_notepad", data.notepad);
      }

      // 3. Notepad Password
      if (typeof data.notepadPassword === "string") {
        if (data.notepadPassword) {
          localStorage.setItem("maths_app_notepad_password", data.notepadPassword);
        } else {
          localStorage.removeItem("maths_app_notepad_password");
        }
      }

      // 4. Progress
      if (data.progress) {
        localStorage.setItem("maths_app_progress", JSON.stringify(data.progress));
      }

      // 5. Glossary XP
      if (data.glossaryXp) {
        localStorage.setItem("guide-maths-custom-xp", String(data.glossaryXp));
      }

      // 6. Onboarding
      if (data.onboardingCompleted) {
        localStorage.setItem("onboarding-completed", String(data.onboardingCompleted));
      }

      // 7. Theme
      if (data.theme) {
        localStorage.setItem("theme", String(data.theme));
      }

      return true;
    } catch (e) {
      console.error("Failed to parse or apply import JSON", e);
      return false;
    }
  };

  return {
    profile,
    notes,
    notepadPassword,
    isNotepadUnlocked,
    updateProfile,
    saveNotes,
    setNotepadPassword,
    clearNotepadPassword,
    unlockNotepad,
    lockNotepad,
    getActiveAvatar,
    exportData,
    importData
  };
}
