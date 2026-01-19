import * as repo from "./repository";
import { createColorSchema, CreateColorInput } from "./schema";

export async function listColors(){
    const colors = await repo.listColors();
    return {
        'code': 200,
        'data': colors,
    };
}

export async function createColor(data: CreateColorInput){
    const validatedData = createColorSchema.parse(data);
    const color = await repo.createColor(validatedData);
    return {
        'code': 200,
        'data': color,
    };
}

export async function getColor(id: string){
    const color = await repo.getColor(id);
    return {
        'code': 200,
        'data': color,
    };
}

export async function updateColor(id: string, data: CreateColorInput){
    const color = await repo.updateColor(id, data);
    return {
        'code': 200,
        'data': color,
    };
}

export async function deleteColor(id: string){
    const color = await repo.deleteColor(id);
    return {
        'code': 200,
        'data': color,
    };
}