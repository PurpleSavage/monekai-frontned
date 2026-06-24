import Dexie, { EntityTable } from "dexie";

import { MetadataPagedVO } from "../../domain/value-objects/metadata-paged.vo";
import { SampleEditedEntity } from "../../../../sampler/domain/entities/sample-edited.entity";

const db = new Dexie('MonekaiDb') as Dexie & {
  samplesEdited: EntityTable<SampleEditedEntity, 'id'>;
  metadata: EntityTable<MetadataPagedVO, 'origin'>;
}
db.version(1).stores({
  samplesEdited: 'id, createdAt',
  metadata: 'origin'
});

export { db }