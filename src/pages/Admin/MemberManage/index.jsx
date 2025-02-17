import { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="container mt-4">
      <h2>用戶管理</h2>
      <button className="btn btn-primary mb-3">新增用戶</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>Email</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">編輯</button>
                <button className="btn btn-sm btn-danger">刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;