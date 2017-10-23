export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    size: number;
    type: string;
    createdAt: string;
    constructor(file: File) {
        this.file = file;
    }
}