import { FireCollection, FireDocument } from 'fire-hose-admin';

export class AppFireDocument<TData> extends FireDocument<TData> {}

export class AppFireCollection<TData, TTransformed> extends FireCollection<TData, TTransformed> {
  findOne(id: string, { cache } = { cache: false }) {
    return super.findOne(id, { cache });
  }
  findOneById(id: string, { cache } = { cache: false }) {
    return super.findOneById(id, { cache });
  }
}
