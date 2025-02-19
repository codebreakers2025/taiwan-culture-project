import { useEffect, useState } from 'react';
import { getAdminUsers } from '@/utils/api';
import './MemberManage.scss';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    const AdminUsers = async() => {
        try{
            const getUsers = await getAdminUsers();
            setUsers(getUsers);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        AdminUsers();
    }, []); 

return (
    <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="d-flex align-items-center gap-2 fw-bold fs-4 mb-0">
            
            用戶管理
            </h2>
            
            <button className="btn btn-primary d-flex align-items-center shadow-sm">
            
            新增用戶
            </button>
        </div>

        <div className="card shadow-sm border-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                    <tr className="bg-light border-bottom">
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">姓名</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">角色</th>
                        <th className="py-3 px-4 text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                    <tr key={user.id}>
                        <td className="py-3 px-4">{user.id}</td>
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3">
                            {user.role}
                        </span>
                        </td>
                        <td className="py-3 px-4">
                        <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-outline-primary btn-sm">
                            
                            編輯
                            </button>
                            <button className="btn btn-outline-danger btn-sm">
                            
                            刪除
                            </button>
                        </div>
                        </td>
                    </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
);
};

export default UserManagement;