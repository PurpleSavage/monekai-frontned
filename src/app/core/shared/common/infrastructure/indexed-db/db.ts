import Dexie, { EntityTable } from "dexie";
import { SampleEntity } from "../../../../sampler/domain/entities/sample.entity";
import { MetadataPagedVO } from "../../domain/value-objects/metadata-paged.vo";

const db = new Dexie('MonekaiDb') as Dexie & {
  samplesEdited: EntityTable<SampleEntity, 'id'>;
  metadata: EntityTable<MetadataPagedVO, 'origin'>;
}
db.version(1).stores({
  samplesEdited: 'id, createdAt',
  metadata: 'origin'
});

export { db }