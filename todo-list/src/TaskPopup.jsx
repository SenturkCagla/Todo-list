import React from "react";

export default function TaskPopup({ visible, onClose, inputValue, onChange, onKeyDown, onDelete, onToggleCompleted, taskId, onSaveTask }) {
  if (!visible) return null;

  return (
    <div className="popup_overlay" onClick={onClose}>
      <div className="popup_content" onClick={e => e.stopPropagation()}>
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
        />
        <div className="popup_buttons">
          <button onClick={() => onSaveTask(taskId)} className="save_btn">💾 Kaydet</button>
          <button onClick={() => onToggleCompleted(taskId)} className="complete_btn">✅ Tamamlandı</button>
          <button onClick={() => onDelete(taskId)} className="delete_btn">🗑 Sil</button>
          
          
        </div>
      </div>
    </div>
  );
}
