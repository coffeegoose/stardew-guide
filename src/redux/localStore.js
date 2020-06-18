function saveData(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
}

function loadData() {
    let defaultState = {
        themeReducer: 0,
        itemReducer: {},
        modeReducer: {
            mode: 'bundle',
            bundleMode: 'bundle'
        },
        itemModalReducer: {
            active: false,
            itemId: 0
        }
    }

    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {

            return defaultState;
        }

        return JSON.parse(serializedState);
        /* return defaultState; */
    } catch (err) {
        return defaultState;
    }
}

export default { saveData, loadData }