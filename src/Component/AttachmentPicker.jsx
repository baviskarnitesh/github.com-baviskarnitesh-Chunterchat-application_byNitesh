

import React from 'react';
import { ImAttachment } from 'react-icons/im';

const AttachmentPicker = ({ onAttachmentClick }) => {
  return (
    <div className="attachment-picker">
      <ImAttachment className="cursor-pointer" onClick={onAttachmentClick} />
      {/* Add other components or logic for handling attachments */}
    </div>
  );
};

export default AttachmentPicker;
