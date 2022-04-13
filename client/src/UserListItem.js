import React from 'react';
import { dateFormat } from './lib/user';

import { Badge, Button } from 'reactstrap';

export default function UserListItem({
    index,
    firstName,
    lastName,
    score,
    address,
    createdAt,
    updatedAt,
    id,
    isActive,
    onEdit,
    onDelete
}) {
    return (
        <tr key={id}>
            <th>{index + 1}</th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{address}</td>
            <td>
                {isActive ? (
                    <Badge color="success" pill>
                        Active
                    </Badge>
                ) : (
                    <Badge pill>Inactive</Badge>
                )}
            </td>
            <td>{score}</td>
            <td>{dateFormat(createdAt)}</td>
            <td>{dateFormat(updatedAt)}</td>
            <td>
                <Button color="primary" outline size="sm" onClick={() => onEdit(id)}>
                    ✏️ Edit
                </Button>{' '}
                <Button color="danger" outline size="sm" onClick={() => onDelete(id)}>
                    🗑 Delete
                </Button>
            </td>
        </tr>
    );
}
