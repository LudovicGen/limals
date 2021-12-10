export class FilterDto {
  public search?: string | null;

  public disablePagination?: true | null;

  public skip?: number | null;

  public take?: number | null;

  public sort?: 'ASC' | 'DESC';

  public orderBy?: string;
}
