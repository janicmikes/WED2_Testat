var note = Object({
    id: null,
    finished: false,
    title: "",
    description: "",
    importance: 0,
    due: null,
    time: {
        created: now(),
        edited: null,
        completed: null
    }
});