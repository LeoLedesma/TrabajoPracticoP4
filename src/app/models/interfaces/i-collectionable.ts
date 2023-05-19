import { Observable } from "rxjs"

export interface ICollectionable <T>
{
    addOne(item:T):boolean
    update(item:T):boolean
    getAll():Observable<T[]>
    removeOne(item:T):boolean
    exists(item:T):Promise<boolean>
}
