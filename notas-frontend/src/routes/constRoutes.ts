export const BASE_API_URL = "http://localhost:3000/api"

export function makeApiNoteRoute(noteId?: string): string {
    const apiNoteRoute = BASE_API_URL + "/note/" + (noteId ?? "")
    return apiNoteRoute
}

export function makeFrontNoteRoute(noteId: number): string {
    const frontNoteRoute = "note/" + noteId
    return frontNoteRoute
}
