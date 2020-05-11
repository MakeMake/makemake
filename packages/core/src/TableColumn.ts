import { key } from 'firebase-key'
export type ValueType = 'string' | 'number' | 'formula'

export interface TableColumnInterface {
  id: string;
  type:ValueType,
  name: string
}

export const TableColumn = {
  create(tableColumn: Partial<TableColumnInterface> = {}): TableColumnInterface {
    const defaultValues = {
      id: key(),
      type: 'string',
      name: 'Untitled'
    }

    return {
      ...defaultValues,
      ...tableColumn
    }
  }
}
