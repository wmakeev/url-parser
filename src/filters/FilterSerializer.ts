export interface FilterSerializer<T extends Object> {
  serialize(filter: T): string
  deserialize(serialized: string): T
}
