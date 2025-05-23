import { IProjectUser, IProjectUserRelation } from "../app/module/project/project.dto";
import { HttpRequestError } from "./error";

export async function isUserAssigner(project: IProjectUser, createdBy: string) {
    // find user with assigner role and same id
    const assigner = project.projectUsers.find((projectUser: IProjectUserRelation) => {
        return projectUser.user.id === createdBy && (projectUser.type === "Assigner" || projectUser.type === 'Creator')
    })

    if (!assigner) {
        throw new HttpRequestError(403, "You are not allowed to create a task for this project", "Forbidden")
    }
}

export async function isUserMemberofProject(project: IProjectUser, userId: string[]) {
    const userFalseProject = []
    userId.forEach((id) => {
        const user = project.projectUsers.find((projectUser: IProjectUserRelation) => {
            return projectUser.user.id === id
        })

        if (!user) {
            userFalseProject.push(id)
        }
    })

    if (userFalseProject.length > 0) {
        throw new HttpRequestError(400, `User Id [${userFalseProject.join(", ")}] is not part of the project`, "Bad Request")
    }
}