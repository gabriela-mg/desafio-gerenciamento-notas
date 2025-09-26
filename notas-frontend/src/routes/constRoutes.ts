const BASE_API_URL = "http://localhost:3000/"

export function makeApiNoteRoute(noteId?: string): string {
    const apiNoteRoute = BASE_API_URL + "api/note/" + (noteId ?? "")
    return apiNoteRoute
}


