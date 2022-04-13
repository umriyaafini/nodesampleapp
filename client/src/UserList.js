import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from './lib/user';
import { sentToLogger } from './lib/utils';

import { Container, Table, Button } from 'reactstrap';
import UserListItem from './UserListItem';

import UserForm from './UserForm';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        getUsers()
            .then((res) => {
                setUsers(res);
            })
            .catch((err) => {
                setUsers(null);
                sentToLogger(err);
            });
    }, [showAddUserModal]);

    function handleEditData(user) {
        setSelectedUser({ ...user });
        setShowAddUserModal(true);
    }

    function handleDeleteData(id) {
        deleteUser(id)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                sentToLogger(err);
            });
    }

    function handleAddUser() {
        setShowAddUserModal(true);
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
                                onEdit={() => handleEditData(user)}
                                onDelete={() => handleDeleteData(user.id)}
                            />
                        ))
                    ) : (
                        <p>Something went wrong</p>
                    )}
                </tbody>
            </Table>
            {showAddUserModal && <UserForm selectedUser={selectedUser} onClose={() => setShowAddUserModal(false)} />}
        </Container>
    );
}
