// 部落格管理組件
import  { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { getJournal ,createdJournal,updatedJournal, deletedJournal } from '@/utils/api';
import './BlogManage.scss';
import BlogModal from '@/components/Modal/Blog';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);

    const AdminBlogManagement = async() => {
        try{
            const getBlog = await getJournal();
            setBlogs(getBlog);
        } catch(error){
            console.log(error);
        }
    }

  const [showModal, setShowModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ id: null, title: "", date: "", status: "草稿" });

  const handleShow = (blog = { id: null, title: "", date: "", status: "" }) => {
    setCurrentBlog(blog);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = async(e) => {
    console.log(currentBlog);
    const { id, title, date, status } = currentBlog;
    if (id) {
      // Update the blog
      await updatedJournal(id, { title, date, status });
      alert("更新成功");
    } else {
      // Create a new blog
      await createdJournal({ title, date, status });
      alert("新增成功");
    }
     // Refresh the list of blogs
     AdminBlogManagement();

     // Close the modal
     handleClose();
  };

  const handleDelete = async(id) => {
    await deletedJournal(id);
    alert("刪除成功");

    // Refresh the list of blogs
    AdminBlogManagement();
  };

  useEffect(() => {
    AdminBlogManagement();
}, []); 

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="d-flex align-items-center gap-2 fw-bold fs-4 mb-0">部落格管理</h2>
        <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={() => handleShow()}>新增文章</button>
      </div>
      <div className="card shadow-sm border-0">
      <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr className="bg-light border-bottom">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">標題</th>
            <th className="py-3 px-4">日期</th>
            {/* <th>狀態</th> */}
            <th className="py-3 px-4 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td className="py-3 px-4">{blog.id}</td>
              <td className="py-3 px-4">{blog.title}</td>
              <td className="py-3 px-4">{blog.date}</td>
              {/* <td>{blog.status}</td> */}
              <td className="py-3 px-4">
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleShow(blog)}>編輯</button>{' '}
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(blog.id)}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>

      <BlogModal 
        showModal={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        
      />

    
    </div>
  );
};

export default BlogManagement;
