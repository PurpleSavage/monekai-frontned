import { Injectable } from "@angular/core";
import { MetadataPersistencePort } from "../../application/ports/metadata-persistence.port";
import { MetadataPagedVO } from "../../domain/value-objects/metadata-paged.vo";
import { LocalPersistenceError } from "../persisitence-error/local-persistence.error";
import { db } from "../indexed-db/db";

@Injectable()
export class MetadataPersistenceService implements MetadataPersistencePort {
  async getMetadataFromOrigin(origin: "samples" | "edits" | "locals"): Promise<MetadataPagedVO | null> {
    try {
      const metadata = await db.metadata.get(origin);
      if(!metadata) return null
      return metadata;
    } catch (error) {
      throw LocalPersistenceError.fromDexieError(
        error,
        `Failed to retrieve local metadata for origin: ${origin}`
      );
    }
  }
  async updateMetadata(metadata: MetadataPagedVO): Promise<void> {
    try {
      await db.metadata.put(metadata);
    } catch (error) {
      throw LocalPersistenceError.fromDexieError(
        error,
        `Failed to update metadata tracking for origin: ${metadata.origin}`
      );
    }
  }
  async saveMetadata(metadata: MetadataPagedVO): Promise<void> {
    try {
      await db.metadata.put(metadata);
    } catch (error) {
      throw LocalPersistenceError.fromDexieError(
        error,
        `Failed to save initial metadata for origin: ${metadata.origin}`
      );
    }
  }
  
}