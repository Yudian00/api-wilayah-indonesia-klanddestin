import { IProject, IProjectUserRelation } from "../app/module/project/project.dto";
import { HttpRequestError } from "./error";


export function isCreator(project: Partial<IProject>, updatedBy: string): boolean {
    return project.createdBy === updatedBy;
}

export function isAssigner(assigners: IProjectUserRelation[], updatedBy: string): boolean {
    return assigners.some(user => user.user.id === updatedBy);
}

export function isCurrentUser(project: IProjectUserRelation[], updatedBy: string) {
    let isCurrentUser = false
    project.some(user => {
        if (user.user.id === updatedBy) {
            isCurrentUser = true
        }
    })

    if (!isCurrentUser) {
        throw new HttpRequestError(403, "User is not allowed to remove user from project", "Forbidden")
    }
}