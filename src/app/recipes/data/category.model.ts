export class CategoryModel {
    name: string;
    items: {
        name: string;
        checked?: boolean;
    }[]
}
