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

export function getAuditTaskDescription(type: number, additionalInfo?: string): string {
    const descriptions: Record<number, string> = {
        1: "melakukan perubahan pada deskripsi project",
        2: "melakukan perubahan pada timeline",
        3: "membuat checklist baru",
        4: "menghapus checklist",
        5: "done checklist",
        6: "undone checklist",
        7: "merubah status dari",
        8: "merubah prioritas dari",
    };

    const baseDescription = descriptions[type];
    if (!baseDescription) {
        throw new Error(`Invalid audit task type: ${type}`);
    }

    // Append additional info if provided (e.g., "merubah status dari A menjadi B")
    return additionalInfo ? `${baseDescription} ${additionalInfo}` : baseDescription;
}