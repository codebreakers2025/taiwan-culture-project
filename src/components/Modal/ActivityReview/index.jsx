import PropTypes from "prop-types";
import { Button, Table, Modal, Form } from "react-bootstrap";

const EventModal = ({ showModal, handleClose, handleSave, currentEvent, setCurrentEvent, newReview, setNewReview, activities }) => {

  return (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>新增評價</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>活動名稱</Form.Label>
              <Form.Select
                value={newReview.activityTitle}
                onChange={(e) => setNewReview({ ...newReview, activityTitle: e.target.value })}
              >
                <option value="">請選擇活動</option>
                    {activities.map((activity) => (
                        <option key={activity.id} value={activity.content.title}>
                        { activity.content.title}
                        </option>
                    ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>評價內容</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={newReview.reviewContent}
                onChange={(e) => setNewReview({ ...newReview, reviewContent: e.target.value })}
                // disabled={newReview.reviewContent}
              >
                
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>評分</Form.Label>
              <Form.Select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                // disabled={newReview.rating}
              >
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={star} value={star}>{"⭐".repeat(star)}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>活動狀態</Form.Label>
              <Form.Select
                value={currentEvent.status}
                onChange={(e) => setCurrentEvent({ ...currentEvent, status: e.target.value })}
              >
                <option value="進行中">進行中</option>
                <option value="已結束">已結束</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>取消</Button>
            <Button variant="primary" onClick={handleSave}>儲存</Button>
        </Modal.Footer>
      </Modal>

        
            

                
           
            


         
        
  );
};


EventModal.propTypes = {
  showModal: PropTypes.bool.isRequired, // 是否顯示 Modal
  handleClose: PropTypes.func.isRequired, // 關閉 Modal 的函數
  handleSave: PropTypes.func.isRequired, // 儲存資料的函數
  currentEvent: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 活動 ID
    status: PropTypes.oneOf(["進行中", "已結束"]).isRequired, // 活動狀態
  }).isRequired,
  setCurrentEvent: PropTypes.func.isRequired, // 設定活動資料的函數
  newReview: PropTypes.object.isRequired,
  setNewReview: PropTypes.func.isRequired, // 設定活動資料的函數
  activities: PropTypes.array.isRequired,
  setActivities: PropTypes.func.isRequired, // 設定活動資料的函數
};

export default EventModal;
