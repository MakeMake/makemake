import { firestore } from 'firebase'
import { key } from 'firebase-key'
import { TableColumn } from './TableColumn'

export type ValueType = 'string' | 'number' | 'formula'

export interface Column {
  id: string;
  type:ValueType,
  name: string
}

export interface TableInterface {
  id: string
  name: string
  columns: Column[]
}

export const Table = {
  create(table: Partial<TableInterface> = {}): TableInterface {
    const defaultValues = {
      id: key(),
      name: 'Untitled',
      columns: [
        TableColumn.create({name: 'Column A'}),
        TableColumn.create({name: 'Column B'}),
        TableColumn.create({name: 'Column C'}),
        TableColumn.create({name: 'Column D'})
      ]
    }

    return {
      ...defaultValues,
      ...table
    }
  },

  queryByProject(db: firestore.Firestore) {
    return (projectID: string) => {
      return db.collection('projects').doc(projectID).collection('tables')
    }
  },

  queryByID(db: firestore.Firestore) {
    return (projectID: string, tableID: string) => {
      return db.collection('projects').doc(projectID).collection('tables').doc(tableID)
    }
  },

  /*
   * Create a project in database
   */
  createTable(db: firestore.Firestore) {
    return async (table: TableInterface, projectID) => {
      return Table.queryByID(db)(projectID, table.id).set(table)
    }
  }
}
