import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from './lib/user';
import { sentToLogger } from './lib/utils';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function UserForm({ onClose, selectedUser }) {
    const [title, setTitle] = useState('Add User');
    const [firstName, setFirstName] = useState(selectedUser && selectedUser.firstName);
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState();
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        if (selectedUser) {
            setTitle('Edit User');
            setFirstName(selectedUser.firstName);
            setLastName(selectedUser.lastName);
            setAddress(selectedUser.address);
            setScore(selectedUser.score);
            setStatus(selectedUser.isActive);
        }
    }, []);

    function resetForm() {
        setFirstName('');
        setLastName('');
        setAddress('');
    }

    async function handleSave() {
        // Simple Validation
        // Should be improve based on product requirement
        if (firstName.length < 1) {
            setValidationMessage('First name should be defined');
            return;
        }
        if (address.length < 1) {
            setValidationMessage('Address should be defined');
            return;
        }

        // Edit data mode
        if (selectedUser) {
            updateUser(selectedUser.id, {
                firstName,
                lastName,
                address,
                score,
                createdAt: selectedUser.createdAt,
                updatedAt: new Date().toISOString(),
                isActive: status,
                deletedAt: null
            })
                .then((res) => {
                    if (res) {
                        resetForm();
                        onClose();
                    }
                })
                .catch((err) => {
                    sentToLogger(err);
                });
        } else {
            createUser({
                firstName,
                lastName,
                address,
                score,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: status,
                deletedAt: null
            })
                .then((res) => {
                    if (res) {
                        resetForm();
                        onClose();
                    }
                })
                .catch((err) => {
                    sentToLogger(err);
                });
        }
    }

    return (
        <div>
            <Modal isOpen>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstname"
                                placeholder="First name"
                                type="text"
                                value={firstName}
                                onChange={(evt) => setFirstName(evt.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                type="text"
                                value={lastName}
                                onChange={(evt) => setLastName(evt.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                placeholder="Address"
                                type="textarea"
                                value={address}
                                onChange={(evt) => setAddress(evt.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="score">Score</Label>
                            <Input
                                id="score"
                                name="score"
                                placeholder="Score"
                                type="number"
                                value={score}
                                onChange={(evt) => setScore(evt.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Input type="checkbox" defaultChecked={status} onChange={() => setStatus(!status)} />{' '}
                            <Label>Active</Label>
                        </FormGroup>
                    </Form>
                    {validationMessage && <p>*{validationMessage}</p>}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>{' '}
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
