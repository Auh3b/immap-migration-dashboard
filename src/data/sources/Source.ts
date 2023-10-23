export interface SourceProps {
  id: string;
  connection?: string;
  urls?: Record<number, string>;
}

export enum SOURCE_MAP_TYPES {
  QUERY = 'query',
  TABLE = 'table',
}

class Source {
  id: string;
  connection: string;
  urls: Record<number, string>;
  data: string;
  phase: number;

  constructor(props: SourceProps) {
    this.id = props.id;
    this.connection = props.connection || '';
    this.urls = props.urls || [];
    this.data = '';
    this.phase = 1;
  }

  getSourceQuery(type: SOURCE_MAP_TYPES, ..._args: any[]) {
    switch (type) {
      case SOURCE_MAP_TYPES.QUERY: {
        return this.getSQLQuery(_args);
      }
      case SOURCE_MAP_TYPES.TABLE: {
        return this.getTableQuery();
      }
    }
  }

  private getTableQuery() {
    const type = SOURCE_MAP_TYPES.TABLE;
    const data = this.getData(type);
    return {
      id: this.id,
      connection: this.connection,
      type,
      data,
    };
  }

  private getSQLQuery(selection: string[]) {
    const type = SOURCE_MAP_TYPES.QUERY;
    const data = this.getData(type, selection);
    return {
      id: this.id,
      connection: this.connection,
      type,
      data,
    };
  }

  setPhase(index: number) {
    this.phase = index ? index : 1;
    return this;
  }

  private getData(type: SOURCE_MAP_TYPES, selection?: string[]) {
    switch (type) {
      case SOURCE_MAP_TYPES.QUERY: {
        return `SELECT ${selection?.join(',') || '*'} FROM ${
          this.urls[this.phase]
        }`;
      }
      case SOURCE_MAP_TYPES.TABLE: {
        return this.urls[this.phase];
      }
    }
  }
}

export default Source;
