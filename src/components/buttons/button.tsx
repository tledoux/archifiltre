import React from "react";

export function mkRB(clickAction, label, enabled, color, customStyle = {}) {
  const defaultButtonStyle = {
    backgroundColor: color ? color : "#4d9e25",
    borderRadius: "50%",
    marginBottom: 0,
  };

  const buttonStyle = { ...defaultButtonStyle, ...customStyle };

  if (enabled) {
    return (
      <button
        type="button"
        className="button active_button"
        onClick={clickAction}
        style={buttonStyle}
      >
        {label}
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className="button"
        onClick={clickAction}
        style={buttonStyle}
        disabled
      >
        {label}
      </button>
    );
  }
}

export function mkTB(clickAction, label, enabled, color, customStyle) {
  const defaultButtonStyle = {
    WebkitTransition: "all 0.2s ease-out",
    backgroundColor: enabled
      ? "rgba(249, 154, 11, 0)"
      : "rgba(249, 154, 11, 0.2)",
    color: color ? color : "#4d9e25",
    cursor: enabled ? "pointer" : "default",
    opacity: enabled ? 1 : 0.7,
    transition: "all 0.2s ease-out",
  };

  const buttonStyle = { ...defaultButtonStyle, ...customStyle };

  if (enabled) {
    return (
      <button
        className="clear button active_button"
        onClick={clickAction}
        style={buttonStyle}
      >
        {label}
      </button>
    );
  } else {
    return (
      <a className="clear button" style={buttonStyle}>
        {label}
      </a>
    );
  }
}
