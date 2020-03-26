export function snapshotToArray<Doc>(snapshot: any): Doc[] {
  const result: any = []

  snapshot.forEach((doc: any) => {
    result.push(doc.data())
  })

  return result
}
