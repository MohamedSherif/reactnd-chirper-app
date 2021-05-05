export const SET_AUTHED_USED = 'SET_AUTHED_USED'

export function setAuthedUser (id) {
    return {
        type : SET_AUTHED_USED,
        id,
    }
}