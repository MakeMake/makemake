import { firestore } from 'firebase'
import { key } from 'firebase-key'


export interface RecordInterface {
  id: string
  name: string
  fields: {}
}

export const Record = {
  create(record: Partial<RecordInterface> = {}): RecordInterface {
    const defaultValues = {
      id: key(),
      name: 'Untitled',
      fields: {}
    }

    return {
      ...defaultValues,
      ...record
    }
  },

  queryByID(db: firestore.Firestore) {
    return (projectID: string, tableID: string, recordID: string) => {
      return db.collection('projects').doc(projectID).collection('tables').doc(tableID).collection('records').doc(recordID)
    }
  },
  queryByTable(db: firestore.Firestore) {
    return (projectID: string, tableID: string) => {
      return db.collection('projects').doc(projectID).collection('tables').doc(tableID).collection('records')
    }
  },
  createRecord(db: firestore.Firestore) {
    return async (record: RecordInterface, projectID: string, tableID: string) => {
      return Record.queryByID(db)(projectID, tableID, record.id).set(record)
    }
  }
}
