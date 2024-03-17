import { useContext } from "react";
import { AppContext } from "../../store/store";

export function useAppContext() {
    const app = useContext(AppContext);
    if (app == undefined) {
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return app
}