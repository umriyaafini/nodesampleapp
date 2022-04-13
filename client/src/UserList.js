import React, { useState, useEffect } from 'react';
import { getUsers } from './lib/user';

import { Container, Table, Button } from 'reactstrap';
import UserListItem from './UserListItem';

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((res) => {
                console.log(res);
                setUsers(res);
            })
            .catch((err) => {
                setUsers(null);
                console.error(err);
            });
    }, []);

    function handleEditData(id) {
        // TBD
        console.log(id);
    }

    function handleDeleteData(id) {
        // TBD
        console.log(id);
    }

    function handleAddUser() {
        // TBD
    }

    return (
        <Container>
            <div className="user-list-header">
                <h3>Table User 👩🏻</h3>
                <Button color="primary" onClick={handleAddUser}>
                    Add User ➕
                </Button>
            </div>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Created</th>
                        <th>Last Update</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users ? (
                        users.map((user, index) => (
                            <UserListItem
                                key={user.id}
                                index={index}
                                {...user}
                                onEdit={() => handleEditData()}
                                onDelete={() => handleDeleteData(user.id)}
                            />
                        ))
                    ) : (
                        <p>Something went wrong</p>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}
