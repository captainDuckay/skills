export interface SkillDoc {
  readonly file: string;
  readonly title: string;
  readonly sections: readonly string[];
  readonly html: string;
  readonly sourceUrl: string;
}

export interface Skill {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly purpose: string;
  readonly whenToUse: string;
  readonly install: string;
  readonly sourceUrl: string;
  readonly docs: readonly SkillDoc[];
  readonly otherFiles: readonly string[];
}

export interface SkillNotes {
  readonly principles: readonly string[];
}

export interface Tenet {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly sources: readonly string[];
}
