export const updateStateObject = (oldStateObj, updatedStateObj) => {
    return {
        ...oldStateObj,
        ...updatedStateObj
    }
};