import { Alexa } from "../alexa/definitions";
import { Observable } from 'rxjs';
import { Ash } from "../ash";

// TODO 
// declare module 'ash' {

//     export interface Ash {

//         namespace(namespace: Alexa.Capability.NamespaceType): Observable<any>
//     }
// }



// Ash.prototype.namespace = toObservable(Ash.prototype.namespace)

// function toObservable<ParamType extends Array<any>>(original: (this: Ash, ...args: ParamType) => any): (this: Ash, ...args: ParamType) => Observable<any> {
//     return new Observable(() => {

//         original.bind(this)

//     })

// }