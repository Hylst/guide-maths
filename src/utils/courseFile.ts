// Adresse du fichier source d'un cours (identifiant `/Cours_Math/...md`).
//
// En production, le serveur refuse tous les fichiers `.md` (403) : le build les
// publie donc en `.txt` (script `postbuild`, scripts/publish_course_text.mjs).
// Le serveur de developpement sert les `.md` tels quels.
export function courseFileUrl(courseId: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const clean = courseId.replace(/^\//, '');
  const file = import.meta.env.DEV ? clean : clean.replace(/\.md$/, '.txt');
  return `${base}${base.endsWith('/') ? '' : '/'}${file}`;
}
