export class SearchQueryFilter {
  search?: string;
  top?: number;
  skip?: number;
  inlinecount?: 'allpages';
  orderby?: string;
  filter?: string;
  foreign?: 'true' | 'false';

  constructor(init?: Partial<SearchQueryFilter>) {
    Object.assign(this, init);
  }
}
