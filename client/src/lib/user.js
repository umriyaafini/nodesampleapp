export const getUsers = () => fetch('/api/users').then((res) => res.json());

export const updateUser = (id, updatedData) =>
    fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    }).then((res) => res.json());

export const createUser = (newUser) =>
    fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then((res) => res.json());

export const deleteUser = (id) =>
    fetch(`/api/users/${id}`, {
        method: 'DELETE'
    }).then((res) => res.json());

export const dateFormat = (utcDate) => {
    const date = new Date(utcDate);
    const time = date.toLocaleTimeString('id-ID');
    const stringDate = date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return `${time}, ${stringDate}`;
};
