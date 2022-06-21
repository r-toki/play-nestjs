import { FireCollection, FireCollectionGroup, FireDocument } from 'fire-hose-admin';

export class AppFireDocument<TData> extends FireDocument<TData> {}

export class AppFireCollection<TData, TTransformed> extends FireCollection<TData, TTransformed> {
  findOne(id: string, { cache } = { cache: false }) {
    return super.findOne(id, { cache });
  }
  findOneById(id: string, { cache } = { cache: false }) {
    return super.findOneById(id, { cache });
  }
}

export class AppFireCollectionGroup<TData, TTransformed> extends FireCollectionGroup<
  TData,
  TTransformed
> {
  findOne(id: string, { cache } = { cache: false }) {
    return super.findOne(id, { cache });
  }
  findOneById(id: string, { cache } = { cache: false }) {
    return super.findOneById(id, { cache });
  }
}
