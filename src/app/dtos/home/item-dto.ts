export class ItemDTO {
    public name?: string;
    public icon?: string;
    public route?: string;
    public isSubItem?: boolean = false;
    public subItems?: ItemDTO[];
}