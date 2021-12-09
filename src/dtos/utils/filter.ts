export class FilterDto {
  public search?: string | null;

  public disablePagination?: true | null;

  public page?: number | null;

  public itemsPerPage?: number | null;

  public sort?: 'ASC' | 'DESC';

  public orderBy?: string[];
}
