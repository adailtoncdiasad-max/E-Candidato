import {
  SphereDataset,
  BAHIA_SPHERES_DATA,
  BAHIA_CANDIDATE_PRESETS,
  BahiaCandidatePreset,
} from "./bahiaElectionData";

export type { SphereDataset, BahiaCandidatePreset };
export { BAHIA_CANDIDATE_PRESETS };

// Base Oficial TSE - Estado da Bahia
export const SPHERES_DATA: Record<string, SphereDataset> = BAHIA_SPHERES_DATA;
export const electionDataBySphere = SPHERES_DATA;
