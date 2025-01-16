import { atom } from "nanostores";

export const manageHeader = atom(false) 

export const toggle =() =>{
    manageHeader.set(!manageHeader.get())
}