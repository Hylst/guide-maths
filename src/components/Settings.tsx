import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Unlock,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sun,
  Moon,
  Shield,
  Key,
  Save,
  BookOpen,
  Eye,
  EyeOff
} from "lucide-react";
import { useLocalAccount, AVATAR_PRESETS, AvatarPreset } from "../hooks/useLocalAccount";

interface SettingsProps {
  account: ReturnType<typeof useLocalAccount>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const STUDY_LEVEL_OPTIONS = [
  { value: "", label: "Non spécifié" },
  { value: "Maternelle", label: "Maternelle" },
  { value: "Primaire", label: "École Primaire" },
  { value: "College", label: "Collège" },
  { value: "Lycee", label: "Lycée" },
  { value: "Post_Bac", label: "Post-Bac / Supérieur" }
];

export default function Settings({ account, isDarkMode, setIsDarkMode }: SettingsProps) {
  const {
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
  } = account;

  // Local input states
  const [pseudo, setPseudo] = useState(profile.pseudo);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [studyLevel, setStudyLevel] = useState(profile.studyLevel);
  const [activeAvatarId, setActiveAvatarId] = useState(profile.avatarId);

  // Notes state
  const [localNotes, setLocalNotes] = useState(notes);
  const [notesSavedStatus, setNotesSavedStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Notepad password state
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Import/Export states
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [importMessage, setImportMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle profile save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      pseudo,
      firstName,
      lastName,
      studyLevel,
      avatarId: activeAvatarId
    });
    // Visual flash or sound could be played, but standard feedback is nice
    const saveBtn = document.getElementById("save-profile-btn");
    if (saveBtn) {
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = "✨ Profil Enregistré !";
      setTimeout(() => {
        saveBtn.innerHTML = originalText;
      }, 2000);
    }
  };

  // Select avatar handler
  const handleSelectAvatar = (avatarId: string) => {
    setActiveAvatarId(avatarId);
  };

  // Save notepad content
  const handleSaveNotes = () => {
    setNotesSavedStatus("saving");
    saveNotes(localNotes);
    setTimeout(() => {
      setNotesSavedStatus("saved");
      setTimeout(() => setNotesSavedStatus("idle"), 2000);
    }, 600000); // just fake delay or instantly save
    // Real localStorage save is instant, so let's do short delay for premium UX
    setTimeout(() => {
      setNotesSavedStatus("saved");
      setTimeout(() => setNotesSavedStatus("idle"), 1500);
    }, 300);
  };

  // Unlock notepad
  const handleUnlockNotepad = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockNotepad(passwordInput);
    if (success) {
      setPasswordInput("");
      setPasswordError(false);
      // Synchronize textarea content from hook
      setLocalNotes(notes);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  // Configure new password for notepad
  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setNewPasswordError("Le mot de passe ne peut pas être vide.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setNewPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    setNotepadPassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError("");
    setIsSettingPassword(false);
  };

  // Clear password protection
  const handleRemovePassword = () => {
    if (window.confirm("Voulez-vous vraiment retirer le mot de passe de protection ? Vos notes seront accessibles directement.")) {
      clearNotepadPassword();
    }
  };

  // Forgot password reset (confidentiality warning)
  const handleForgotPassword = () => {
    if (
      window.confirm(
        "Par sécurité, oublier le mot de passe nécessite de réinitialiser le bloc-notes. Cela effacera définitivement son contenu actuel. Voulez-vous continuer ?"
      )
    ) {
      saveNotes("");
      setLocalNotes("");
      clearNotepadPassword();
    }
  };

  // Export data trigger
  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `guide_maths_sauvegarde_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import file handler
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const success = importData(result);
      if (success) {
        setImportStatus("success");
        setImportMessage("Données importées avec succès ! Rechargement de la page dans 2 secondes...");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setImportStatus("error");
        setImportMessage("Fichier de sauvegarde invalide ou corrompu.");
        setTimeout(() => setImportStatus("idle"), 4000);
      }
    };
    reader.readAsText(file);
  };

  const currentAvatar = AVATAR_PRESETS.find((a) => a.id === activeAvatarId) || AVATAR_PRESETS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card p-6 md:p-8 rounded-3xl border border-border-strong overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
      >
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-indigo-500/5 via-indigo-500/0 to-transparent pointer-events-none" />
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center justify-center md:justify-start gap-3">
            <User className="w-8 h-8 text-primary" />
            Paramètres & Profil
          </h1>
          <p className="text-muted-text text-sm md:text-base font-medium">
            Gérez votre identité locale, vos préférences graphiques, vos notes et vos sauvegardes.
          </p>
        </div>

        {/* Global theme quick toggle card */}
        <div className="flex items-center gap-3 bg-muted p-2 rounded-2xl border border-border-strong">
          <button
            onClick={() => setIsDarkMode(false)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              !isDarkMode
                ? "bg-white text-slate-800 shadow-sm"
                : "text-muted-text hover:text-foreground"
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            Clair
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isDarkMode
                ? "bg-slate-800 text-white shadow-sm"
                : "text-muted-text hover:text-foreground"
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            Sombre
          </button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Profile & Avatar (7/12) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-7 bg-card p-6 md:p-8 rounded-3xl border border-border-strong shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-white dark:border-slate-800 transition-all duration-300 relative"
              style={{ background: currentAvatar.bgGradient }}
            >
              {currentAvatar.emoji}
              <span className="absolute -bottom-1 -right-1 bg-primary text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md">
                Avatar
              </span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Identité de l'Élève</h2>
              <p className="text-xs text-muted-text font-semibold">Sauvegardée localement sur cet appareil</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-text uppercase tracking-wider">Pseudo ou Prénom</label>
                <input
                  type="text"
                  placeholder="Ex: Geoff"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted text-foreground border-transparent focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-text uppercase tracking-wider">Nom de famille (Optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex: Dupont"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted text-foreground border-transparent focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-text uppercase tracking-wider">Niveau d'études (Optionnel)</label>
              <select
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted text-foreground border-transparent focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm transition-all outline-none cursor-pointer"
              >
                {STUDY_LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Avatar Selector Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-text uppercase tracking-wider block">
                Sélectionner un Avatar Thématique (16 présélections)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {AVATAR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    title={preset.label}
                    onClick={() => handleSelectAvatar(preset.id)}
                    className={`w-full aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all relative border-2 cursor-pointer ${
                      activeAvatarId === preset.id
                        ? "border-primary scale-110 shadow-lg shadow-primary/20 ring-4 ring-primary-light"
                        : "border-transparent hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                    style={{ background: preset.bgGradient }}
                  >
                    {preset.emoji}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-text font-bold italic text-center">
                Inspiré des plus grands scientifiques et mathématiciens de l'Histoire.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="save-profile-btn"
                className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-2xl text-sm transition-all active:scale-95 shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Enregistrer les Modifications
              </button>
            </div>
          </form>
        </motion.div>

        {/* Right column: Notepad & Security (5/12) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 bg-card p-6 md:p-8 rounded-3xl border border-border-strong shadow-sm space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                <h2 className="text-xl font-extrabold text-foreground">Bloc-Notes</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
                Persistant
              </span>
            </div>

            {/* Verification / Lock UI */}
            {!isNotepadUnlocked ? (
              <form onSubmit={handleUnlockNotepad} className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50 rounded-2xl flex items-center justify-center mx-auto text-rose-500">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-foreground">Ce bloc-notes est sécurisé</h3>
                  <p className="text-xs text-muted-text">Veuillez saisir votre mot de passe pour le lire ou l'éditer.</p>
                </div>
                <div className="max-w-xs mx-auto space-y-2">
                  <input
                    type="password"
                    placeholder="Saisir le mot de passe..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={`w-full px-4 py-2 bg-muted text-foreground border text-center rounded-xl text-sm outline-none transition-all ${
                      passwordError
                        ? "border-rose-500 ring-2 ring-rose-200 bg-rose-50 dark:bg-rose-900/10"
                        : "border-transparent focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light"
                    }`}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      Déverrouiller
                    </button>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="px-3 py-2 bg-muted hover:bg-border-strong text-muted-text hover:text-foreground font-semibold rounded-xl text-xs transition-all cursor-pointer"
                    >
                      Oublié ?
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Unlocked / Editing Notepad UI */
              <div className="space-y-4">
                <textarea
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  placeholder="Notez vos formules importantes, vos théorèmes favoris ou des remarques de révisions ici..."
                  className="w-full h-44 px-4 py-3 bg-muted text-foreground border-transparent focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light rounded-2xl text-sm transition-all outline-none font-medium resize-none"
                />
                
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-sm shadow-primary/10 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {notesSavedStatus === "saving"
                      ? "Sauvegarde..."
                      : notesSavedStatus === "saved"
                      ? "Notes Sauvegardées !"
                      : "Sauvegarder les notes"}
                  </button>

                  <button
                    onClick={lockNotepad}
                    className="px-3 py-2 bg-muted hover:bg-border-strong text-muted-text hover:text-foreground font-semibold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1"
                    title="Verrouiller la session active"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Verrouiller
                  </button>
                </div>

                {/* Password Setting Accordion / Controls */}
                <div className="pt-4 border-t border-border mt-2">
                  {!notepadPassword ? (
                    <div>
                      {!isSettingPassword ? (
                        <button
                          onClick={() => setIsSettingPassword(true)}
                          className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          Activer la protection par mot de passe
                        </button>
                      ) : (
                        <form onSubmit={handleCreatePassword} className="bg-muted p-4 rounded-2xl border border-border-strong space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider flex items-center gap-1">
                              <Key className="w-3 h-3 text-indigo-500" /> Sécurisation du bloc-notes
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setIsSettingPassword(false);
                                setNewPasswordError("");
                              }}
                              className="text-muted-text hover:text-rose-500 text-xs font-bold"
                            >
                              Annuler
                            </button>
                          </div>
                          
                          <div className="relative">
                            <input
                              type={showPass ? "text" : "password"}
                              placeholder="Mot de passe"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full pr-10 pl-3 py-1.5 bg-card text-foreground border border-border-strong focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-xs outline-none transition-all"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPass(!showPass)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-text hover:text-foreground cursor-pointer"
                            >
                              {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <input
                            type={showPass ? "text" : "password"}
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-1.5 bg-card text-foreground border border-border-strong focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-xs outline-none transition-all"
                            required
                          />
                          {newPasswordError && (
                            <p className="text-[10px] text-rose-500 font-bold">{newPasswordError}</p>
                          )}
                          <button
                            type="submit"
                            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg text-[10px] uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                          >
                            Activer le mot de passe
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleRemovePassword}
                        className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Désactiver la protection
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsSettingPassword(true);
                          // Clear so it behaves as setting new pass
                          setNotepadPassword("");
                        }}
                        className="py-2 px-3 bg-muted hover:bg-border-strong text-muted-text hover:text-foreground font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5" />
                        Changer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="text-[10px] text-muted-text font-bold italic pt-4 text-center border-t border-border-strong/50">
            Les notes ne sortent jamais de votre navigateur.
          </div>
        </motion.div>
      </div>

      {/* Import/Export Save Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card p-6 md:p-8 rounded-3xl border border-border-strong shadow-sm space-y-6"
      >
        <div>
          <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" />
            Gestion des Données Personnelles
          </h2>
          <p className="text-xs text-muted-text font-semibold">
            Toutes vos données (cours validés, scores aux quiz, révisions programmées, badges débloqués, connexions personnelles, scores Quiz Rush, profil, bloc-notes et thème) sont stockées localement dans votre navigateur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Card */}
          <div className="bg-muted p-5 rounded-2xl border border-border-strong/50 flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                Exporter mes données de profil et d'avancement
              </h3>
              <p className="text-xs text-muted-text">
                Générez un fichier JSON de sauvegarde de tout votre parcours. Vous pourrez l'importer pour restaurer vos données sur un autre appareil ou navigateur.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="w-full md:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              Télécharger ma sauvegarde (.json)
            </button>
          </div>

          {/* Import Card */}
          <div className="bg-muted p-5 rounded-2xl border border-border-strong/50 flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-500" />
                Importer une sauvegarde existante
              </h3>
              <p className="text-xs text-muted-text">
                Téléversez un fichier de sauvegarde `.json` précédemment exporté. <strong className="text-rose-500 dark:text-rose-400 font-bold">Attention :</strong> cela écrasera définitivement toute votre progression actuelle.
              </p>
            </div>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleImportFile}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full md:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Upload className="w-4 h-4" />
                Sélectionner un fichier de sauvegarde
              </button>
            </div>
          </div>
        </div>

        {/* Import Message Feedback */}
        <AnimatePresence>
          {importStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-bold ${
                importStatus === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              {importStatus === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500" />
              )}
              {importMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
