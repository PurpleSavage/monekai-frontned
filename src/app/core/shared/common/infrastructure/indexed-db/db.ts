import Dexie, { EntityTable } from "dexie";
import { SampleEntity } from "../../../../sampler/domain/entities/sample.entity";
import { MetadataPagedVO } from "../../domain/value-objects/metadata-paged.vo";

const db = new Dexie('MonekaiDb') as Dexie & {
  samples: EntityTable<SampleEntity, 'id'>;
  metadata: EntityTable<MetadataPagedVO, 'origin'>;
}
db.version(1).stores({
  samples: 'id, createdAt',
  metadata: 'origin'
});

export { db }