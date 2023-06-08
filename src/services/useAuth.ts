import { BrowserStorageService } from "./browser_storage_service";

export const useAuth = () => {
    let isLoggedIn = false;
    const username = BrowserStorageService.get('username');
    const role = BrowserStorageService.get('role');
    if (username && role) {
        isLoggedIn = true;
    }
    return isLoggedIn;
}

function isEmpty(str: String) {
    return (!str || str.length === 0 );
}

export const isAdmin = () => {
    const username = BrowserStorageService.get('username');
    const role = BrowserStorageService.get('role');
    if( !isEmpty(username) && !isEmpty(role)){
        if( role === 'admin'){
            return true;
        }else{
            return false;
        }
    }
}

export const getCurrentUser = () => {
    const username = BrowserStorageService.get('username');
    if( !isEmpty(username)){
        return username
    }else{
        return null
    }
}

export const adminTimeSlotFunc = () => {
    return BrowserStorageService.get('adminTimeSlots') || {};
}