type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type groupType = {
    id: string,
    name: string,
    permissions: Array<Permission>,
}