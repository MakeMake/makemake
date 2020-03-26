import { firestore } from 'firebase'
import { key } from 'firebase-key'
import { Member } from './Member'

export interface ProjectInterface {
  id: string
  title: string
  slug: string
  ownerID: string
}

export const Project = {
  create(project: Partial<ProjectInterface> = {}): ProjectInterface {
    const defaultValues = {
      id: key(),
      title: '',
      slug: '',
      ownerID: ''
    }

    return {
      ...defaultValues,
      ...project
    }
  },

  queryByID(db: firestore.Firestore) {
    return (projectID: string) => {
      return db.collection('projects').doc(projectID)
    }
  },

  /*
   * Create a project in database
   */
  createProject(db: firestore.Firestore) {
    return async (project: ProjectInterface): Promise<ProjectInterface> => {
      const batch = db.batch()

      const member = Member.create({
        id: project.ownerID,
        role: 'admin',
        projectID: project.id
      })

      batch.set(Project.queryByID(db)(project.id), project)
      batch.set(Member.queryByID(db)(project.id, member.id), member)

      return batch.commit()
    }
  }
}
