import PropTypes from "prop-types";
import { Button, Table, Modal, Form } from "react-bootstrap";
import  { useState } from "react";
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const blogModal = ({ showModal, handleClose, handleSave }) => {

  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    date: "",
    status: "發佈",
    content: EditorState.createEmpty(), // 初始化 EditorState
  });

  // 工具列配置
  const TOOLBAR_BUTTONS = [
    { label: 'B', style: 'BOLD', type: 'inline' },
    { label: 'I', style: 'ITALIC', type: 'inline' },
    { label: 'U', style: 'UNDERLINE', type: 'inline' },
    { label: 'H1', style: 'header-one', type: 'block' },
    { label: 'H2', style: 'header-two', type: 'block' },
    { label: '•', style: 'unordered-list-item', type: 'block' },
    { label: '1.', style: 'ordered-list-item', type: 'block' },
  ];

  // 處理輸入變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
  };

  // 處理編輯器狀態變更
  const onEditorStateChange = (editorState) => {
    setCurrentBlog({ ...currentBlog, content: editorState });
  };

  // 處理鍵盤命令
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(currentBlog.content, command);
    if (newState) {
      onEditorStateChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // 檢查樣式是否啟用
  const isStyleActive = (style, type) => {
    if (type === 'inline') {
      return currentBlog.content.getCurrentInlineStyle().has(style);
    }
    const selection = currentBlog.content.getSelection();
    const blockType = currentBlog.content
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return blockType === style;
  };

  // 切換樣式
  const toggleStyle = (style, type) => {
    const newState = type === 'inline'
      ? RichUtils.toggleInlineStyle(currentBlog.content, style)
      : RichUtils.toggleBlockType(currentBlog.content, style);
    onEditorStateChange(newState);
  };

  // 處理圖片上傳
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        insertImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // 插入圖片
  const insertImage = (url) => {
    const contentState = currentBlog.content.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      currentBlog.content,
      { currentContent: contentStateWithEntity }
    );
    
    onEditorStateChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    );
  };

  // 自定義區塊渲染
  // const blockRendererFn = (block) => {
  //   if (block.getType() === 'atomic') {
  //     return {
  //       component: MediaComponent,
  //       editable: false,
  //     };
  //   }
  //   return null;
  // };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Form>
    <Modal.Header closeButton>
      <Modal.Title>新增文章</Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Form.Group className="mb-3">
          <Form.Label>標題</Form.Label>
          <Form.Control
            type="text"
            value={currentBlog.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>日期</Form.Label>
          <Form.Control
            type="date"
            value={currentBlog.date}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>內容</Form.Label>
            <div className="editor-container" style={{ border: '1px solid #ddd' }}>
              {/* 工具列 */}
              <div className="toolbar" style={{ 
                borderBottom: '1px solid #ddd', 
                padding: '5px', 
                backgroundColor: '#f8f9fa'
              }}>
                {TOOLBAR_BUTTONS.map(({ label, style, type }) => (
                  <Button
                    key={style}
                    variant={isStyleActive(style, type) ? "secondary" : "outline-secondary"}
                    size="sm"
                    className="me-1"
                    onClick={() => toggleStyle(style, type)}
                    style={{ minWidth: '30px' }}
                  >
                    {label}
                  </Button>
                ))}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  圖片
                </Button>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
              
              {/* 編輯器 */}
              <div style={{ padding: '10px', minHeight: '200px' }}>
                <Editor
                  editorState={currentBlog.content}
                  onChange={onEditorStateChange}
                  handleKeyCommand={handleKeyCommand}
                  // blockRendererFn={blockRendererFn}
                  placeholder="請輸入文章內容..."
                />
              </div>
            </div>
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>狀態</Form.Label>
          <Form.Select
            value={currentBlog.status}
            onChange={handleInputChange}
          >
            <option value="發佈">發佈</option>
            <option value="草稿">草稿</option>
          </Form.Select>
        </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>取消</Button>
      <Button variant="primary" onClick={() => handleSave(currentBlog)}>儲存</Button>
    </Modal.Footer>
      </Form>
  </Modal>
  );
};


blogModal.propTypes = {
  showModal: PropTypes.bool.isRequired, // 是否顯示 Modal
  handleClose: PropTypes.func.isRequired, // 關閉 Modal 的函數
  handleSave: PropTypes.func.isRequired, // 儲存資料的函數
  
};

export default blogModal;
