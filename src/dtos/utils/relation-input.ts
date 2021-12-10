export class RelationInput<T> {
  public create?: T;
  public connect?: T;
}

export class RelationsInput<T> {
  public create?: T[];
  public connect?: T[];
}
