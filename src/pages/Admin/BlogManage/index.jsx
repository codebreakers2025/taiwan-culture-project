// 部落格管理組件
import  { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { getJournal } from '@/utils/api';
import './BlogManage.scss';

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
  const [currentBlog, setCurrentBlog] = useState({ id: null, title: "", date: "", status: "" });

  const handleShow = (blog = { id: null, title: "", date: "", status: "" }) => {
    setCurrentBlog(blog);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (currentBlog.id) {
      setBlogs(blogs.map(b => (b.id === currentBlog.id ? currentBlog : b)));
    } else {
      setBlogs([...blogs, { ...currentBlog, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
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


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentBlog.id ? "編輯文章" : "新增文章"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>標題</Form.Label>
              <Form.Control
                type="text"
                value={currentBlog.title}
                onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>日期</Form.Label>
              <Form.Control
                type="date"
                value={currentBlog.date}
                onChange={(e) => setCurrentBlog({ ...currentBlog, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>狀態</Form.Label>
              <Form.Select
                value={currentBlog.status}
                onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value })}
              >
                <option value="發佈">發佈</option>
                <option value="草稿">草稿</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>取消</Button>
          <Button variant="primary" onClick={handleSave}>儲存</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogManagement;
