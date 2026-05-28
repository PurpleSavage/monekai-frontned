import { MetadataPagedVO } from "../../domain/value-objects/metadata-paged.vo";

export abstract class MetadataPersistencePort {
  abstract saveMetadata(metadata: MetadataPagedVO): Promise<void>;
  abstract getMetadataFromOrigin(origin: 'samples' | 'edits' | 'locals'): Promise<MetadataPagedVO | null>;
  abstract updateMetadata(metadata: MetadataPagedVO): Promise<void>;
}