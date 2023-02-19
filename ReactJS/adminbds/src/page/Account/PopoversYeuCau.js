
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
  <Popover>
    <Popover.Header as="h3">Xin chào bạn!</Popover.Header>
    <Popover.Body>
      Bạn vui lòng đăng nhập thông tin để có thể gửi nội dung yêu cầu nhanh nhất!
    </Popover.Body>
  </Popover>
);

const Example = () => (
  <OverlayTrigger  placement="right" overlay={popover}>
    <div>Yêu cầu liên hệ lại</div>
  </OverlayTrigger>
);

export default Example;