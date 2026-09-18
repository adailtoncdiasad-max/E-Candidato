// Types for TSE Open Data Integration (CKAN API & Pipeline)

export interface TSEDatasetResource {
  id: string;
  name: string;
  description?: string;
  format: string;
  url: string;
  created?: string;
  last_modified?: string;
  size?: number;
}

export interface TSEDataset {
  id: string;
  name: string;
  title: string;
  notes?: string;
  groups?: { id: string; name: string; title: string }[];
  organization?: { id: string; name: string; title: string };
  resources: TSEDatasetResource[];
  metadata_modified?: string;
}

export interface TSEGroupSummary {
  name: string;
  title: string;
  description: string;
  packageCount: number;
  mappedElectoralModule: string;
  strategicImportance: "ALTA" | "MÉDIA" | "COMPLEMENTAR";
  iconName: string;
}

export interface TSEOrganizationSummary {
  name: string;
  title: string;
  description: string;
}

export interface TSEConnectionStatus {
  online: boolean;
  endpoint: string;
  datasetCount: number;
  groupCount: number;
  orgCount: number;
  latencyMs: number;
  lastChecked: string;
  source?: "live" | "fallback";
  stale?: boolean;
  error?: string;
}

export interface TSEIngestionPipelineStatus {
  pipelineId: string;
  name: string;
  targetModule: string;
  sourceGroup: string;
  frequency: string;
  lastRun: string;
  status: "ATIVO" | "SINCRONIZADO" | "AGENDADO" | "EM_PROGRESSO";
  processedRecords: number;
}
