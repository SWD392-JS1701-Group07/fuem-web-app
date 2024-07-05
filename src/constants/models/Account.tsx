export type Account = {
    id: number,
    name: string;
    email: string,
    username: string,
    password: string,
    studentId: string,
    phoneNumber: string,
    dob: Date,
    gender: string,
    avatarUrl: string,
    roleId: number,
    subjectId: number,
    accountStatus: string,
};
export type AccountCreateModel = {
    name: string,
    email: string,
    username: string,
    password: string,
    studentId: string | null,
    phoneNumber: string,
    dob: Date,
    gender: string,
    avatarUrl: string,
    roleId: number,
    subjectId: number | null,
}