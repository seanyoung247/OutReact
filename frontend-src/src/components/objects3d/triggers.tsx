
import { triggers } from "~/utilities/triggers";
import { getContainerHandler, handlers } from "./containers";

type Action = keyof typeof handlers
export const registerHandlers = () => {
    (Object.keys(handlers) as Action[]).forEach((action) => {
        triggers.registerManager(`container-${action}`, (id:string) => (
            getContainerHandler(action, id) 
        ))    
    });
}
